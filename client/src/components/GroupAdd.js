import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const GroupAdd = () => {
  const [show, setShow] = useState(false);
  const [log, setLog] = useState();

  const onChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const styles = {
    marginTop: "20px",
  };

  const submit = () => {};

  return (
    <div style={styles}>
      <Button variant="primary" onClick={handleShow}>
        Add Log
      </Button>

      <hr />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Coffee Log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Supports Markdown</Form.Label>
            <Form.Control
              name="log"
              onChange={onChange}
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Log
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GroupAdd;
