import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmModal = () => {
  const show = true;
  const handleClose = ()=>{
    console.log("close")
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
      {/*   <Modal.Header closeButton> */}
      {/*     <Modal.Title>Modal heading</Modal.Title> */}
      {/*   </Modal.Header> */}
      {/*   <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body> */}
      {/*   <Modal.Footer> */}
      {/*     <Button variant="secondary" onClick={handleClose}> */}
      {/*       Close */}
      {/*     </Button> */}
      {/*     <Button variant="primary" onClick={handleClose}> */}
      {/*       Save Changes */}
      {/*     </Button> */}
      {/*   </Modal.Footer> */}
      </Modal>
    </>
  );
}

export {ConfirmModal};
