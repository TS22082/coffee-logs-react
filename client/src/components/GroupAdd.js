import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const GroupAdd = () => {
  const [show, setShow] = useState(false);
  const [log, setLog] = useState("");

  const onChange = (e) => {
    setLog({ [e.target.name]: e.target.value });
  };

  const toggleModal = () => setShow(show === false ? true : false);

  const styles = {
    marginTop: "20px",
  };

  const submit = async () => {
    try {
      const logRes = await axios.post("/logs", log, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      console.log(logRes);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles}>
      <Button variant="primary" className="shadow-sm" onClick={toggleModal}>
        Add Log
      </Button>

      <hr />

      <Modal show={show} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Coffee Log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Supports Markdown</Form.Label>
            <Form.Control
              name="text"
              onChange={onChange}
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              toggleModal();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              submit();
              toggleModal();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GroupAdd;
