import React, { useState, useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router-dom";
import GroupAdd from "../components/GroupAdd";
import UserContext from "../Context/UserContext";
import axios from "axios";
import { Col, Row, Card, Dropdown } from "react-bootstrap";
import "./home.css";

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
    return () => source.cancel();
  }, [source]);

  const cardStyles = {
    height: "250px",
    overflow: "hidden",
  };

  const truncate = (str) => str.split("").splice(0, 40).join("") + " ...";

  return (
    <div>
      <GroupAdd />
      <Row>
        {logs.length
          ? logs.map((log, index) => (
              <Col xs={12} md={6} key={index}>
                <Card className="mt-4" style={cardStyles}>
                  <Card.Body>
                    <div className="text-right">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="secondary-outline"
                          id="dropdown-basic"
                        ></Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              history.push(`/item/${log._id}`);
                            }}
                          >
                            View
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <ReactMarkdown className="fadeText">
                      {truncate(log.text)}
                    </ReactMarkdown>
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
