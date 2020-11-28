import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Form, Button, Row, Col, Card, Dropdown } from "react-bootstrap";

const Item = (props) => {
  const [log, setLog] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const history = useHistory();

  const btnStyles = {
    width: "80px",
  };

  const onChange = (e) => {
    e.preventDefault();
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const deleteLog = async (id) => {
    try {
      await axios.delete(`/logs/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      axios.patch("/logs/edit", log, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
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
        {!editMode ? (
          <Card className="shadow p-3 mt-4">
            <Card.Body>
              <div className="text-right">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="secondary-outline"
                    id="dropdown-basic"
                  >
                    Options
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow-sm">
                    <Dropdown.Item
                      onClick={() => {
                        setEditMode(true);
                      }}
                    >
                      Edit
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => {
                        deleteLog(log._id);
                      }}
                    >
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        history.push("/home");
                      }}
                    >
                      Home
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <ReactMarkdown>{log.text}</ReactMarkdown>
            </Card.Body>
          </Card>
        ) : (
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
                rows={10}
              />
            </Form.Group>
            <Form.Group>
              <div className="text-right">
                <Button
                  onClick={() => setEditMode(false)}
                  variant="secondary mr-2 shadow-sm"
                  style={btnStyles}
                >
                  Cancel
                </Button>
                <Button
                  onClick={submit}
                  variant="primary shadow-sm"
                  style={btnStyles}
                >
                  Save
                </Button>
              </div>
            </Form.Group>
          </Form>
        )}
      </Col>
    </Row>
  );
};

export default Item;
