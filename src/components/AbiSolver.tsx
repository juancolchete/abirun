import React, { useEffect, useState } from "react";
import ethers, { Interface } from "ethers";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";

const AbiSolver = (props: any) => {
  const [contractAddress,setContractAddress] = useState("");
  const [selectedABI,setSelectedABI] = useState("");
  const [params,setParams] = useState<any>([]);
  const [loaded,setLoaded] = useState<boolean>(false);
  const [contracts,setContracts] = useState<any>();
  const [address, setAddress] = useState("");
  
  useEffect(()=>{
    const loadContracts = async ()=>{
      const reponse = await axios.get(props.abiLink)
      const reponseData = reponse.data;
      setContracts(reponseData);
      setSelectedABI(Object.keys(reponseData)[0]);
      setLoaded(true);
    }
    if(loaded == false){
      loadContracts();
    }
    const windowProp:any = window;
    if(windowProp?.ethereum){
      if(windowProp?.ethereum.selectedAddress){
        const selectedAddress = windowProp?.ethereum.selectedAddress;
        console.log("selected address: ", selectedAddress);
        setAddress(selectedAddress)
      }else{
        windowProp.ethereum.request({ method: 'eth_requestAccounts' });
      }
    }
  },[loaded])

  const setInputs = async (name:string,index:number,value:any)=>{
    const paramsTemp = params
    for(let i=index;i <= params.length;i++){
      paramsTemp.push()
    }
    paramsTemp[index] = value;
    setParams(paramsTemp)
  }

  const executeFunction = async (name:string)=>{
    try{
      const windowProp:any = window;
      if(windowProp?.ethereum){
        const provider = new ethers.BrowserProvider(windowProp.ethereum);
        const signer = new ethers.JsonRpcSigner(provider,windowProp?.ethereum.selectedAddress);
        const contract = new ethers.Contract(contractAddress,contracts[selectedABI],signer);
        console.log(`======${name}=======`)
        let response;
        if(params.length > 0 && params[0].length>0){
          response = await contract[name](...params);
        }else{
          response = await contract[name]();
        }
        const outputs = contracts[selectedABI].filter((e:any)=>{return e.name == name})[0].outputs;
        if(outputs.length > 1){
          for(let i=0;i < outputs.length;i++){
            if(outputs[i].type.indexOf("int") > -1){
              console.log(outputs[i].name,":",response[i].toString());
            }else{
              console.log(outputs[i].name,":",response[i]);
            }
          }
        }else{
          console.log(name,":",response);
        }
        console.log(`======${name}=======`)
      }
    }catch(e:any){
      console.log("xxxxxxx error xxxxxxxx")
      if(e.toString().indexOf("Error: execution reverted (unknown custom error)") > -1){
        const errordata = e.data;
        const iface = new Interface(contracts[selectedABI]);
        const selector = errordata.slice(0,10);
        const res = iface.decodeErrorResult(selector, errordata);
        const errorName = iface.getError(selector)?.name;
        console.log(errorName);
        console.log(res.toString());
      }else{
        console.log(e);
      }
      console.log("xxxxxxx error xxxxxxxx")
    }
  }

  return (
    <Container className="col-sm">
      {address?.length > 0 &&(
        <>
          <h1>{selectedABI}</h1>
          <h1>{contractAddress}</h1>
          <Form.Control size="lg" type="text" placeholder="contract" onChange={(e)=>setContractAddress(e.target.value)}/>
          <select onChange={(e)=>setSelectedABI(e.target.value)}>
            {loaded && (Object.keys(contracts)as any).map((item:any)=>(
              <option value={item} key={item} >{item}</option>
            ))}
          </select>
        </> 
      )}
      <br/>
      {loaded && address?.length > 0 && contracts[selectedABI].map((item:any)=>(
        item.type == "function" ?
        <>
          { item.name != "safeTransferFrom" ?
          <Button onClick={() => executeFunction(item.name)}>{item.name} {new Interface(contracts[selectedABI]).getFunction(item.name)?.selector}</Button>:<></>}
          <br/>
          {item.inputs.map(
            (inputItem:any, index:any)=>(
              <Form.Control size="lg" type="text" key={index} placeholder={inputItem.name} onChange={(e)=>setInputs(item.name,index,e.target.value)}/>
             )
          )}
        </>:<></>
      ))}
    </Container>
  )
}

export default AbiSolver;

