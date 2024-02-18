import React from 'react';
import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';

const ConfirmModal = ({show, handleClose, text, params,functionIputs}) => {

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please approve {text} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {params?.[text]?.length > 0 && params[text].map((item,index)=>(
            <p key={index}>{functionIputs[index].name} {item}</p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export {ConfirmModal};

