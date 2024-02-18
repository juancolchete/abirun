import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmModal = (props: any) => {

  return (
    <>
      <Button variant="primary" onClick={props.handleShow()}>
        Launch demo modal
      </Button>

      <Modal show={props.show} onHide={props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;