import React, { useState, useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router-dom";
import GroupAdd from "../components/GroupAdd";
import UserContext from "../Context/UserContext";
import axios from "axios";
import { Col, Row, Card, Dropdown } from "react-bootstrap";

const Home = () => {
  const { userData } = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) {
      history.push("/");
    }
  }, [userData.user, history]);

  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/logs", {
          cancelToken: source.token,
          headers: { "x-auth-token": localStorage.getItem("auth-token") },
        });
        setLogs(data);
      } catch (err) {
        axios.isCancel(err)
          ? console.log("Request cancelled")
          : console.log(err);
      }
    })();

    return () => source.cancel("Operation cancelled");
  }, [source]);

  const deleteLog = async (id) => {
    try {
      const deleteRes = await axios.delete(`/logs/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      console.log(deleteRes);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <GroupAdd />
      <Row>
        {logs.length
          ? logs.map((log) => (
              <Col xs={12} md={6}>
                <Card>
                  <Card.Body>
                    <div className="text-right">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="secondary-outline"
                          id="dropdown-basic"
                        ></Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>Edit</Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              deleteLog(log._id);
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <ReactMarkdown>{log.text}</ReactMarkdown>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : null}
      </Row>
    </div>
  );
};

export default Home;
