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

  return (
    <div>
      <GroupAdd />

      <Row>
        {logs.map((log) => (
          <Col xs={12} md={4}>
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
                      <Dropdown.Item>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <ReactMarkdown>{log.text}</ReactMarkdown>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
