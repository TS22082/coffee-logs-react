import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

const Edit = (props) => {
  const [log, setLog] = useState([]);
  const history = useHistory();

  const onChange = (e) => {
    e.preventDefault();
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `/logs/find/${props.match.params.id}`,
          {
            headers: { "x-auth-token": localStorage.getItem("auth-token") },
          }
        );
        setLog(data[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [props]);
  return (
    <Row className="mt-4">
      <Col md={{ span: 8, offset: 2 }}>
        <Form>
          <Form.Group>
            <Form.Label>
              <h2>Edit this log (supports markdown)</h2>
            </Form.Label>
            <Form.Control
              name="text"
              onChange={onChange}
              value={log.text}
              as="textarea"
              rows={6}
            />
          </Form.Group>
          <Form.Group>
            <div className="text-right">
              <Button
                onClick={() => history.push("/")}
                variant="secondary"
                className="mr-2"
              >
                Cancel
              </Button>
              <Button variant="primary">Save Log</Button>
            </div>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default Edit;
