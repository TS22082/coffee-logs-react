import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Settings.css";

const Profile = (props) => {
  const history = useHistory();

  const [user, setUser] = useState({
    confirmed: null,
    displayName: null,
    email: null,
    id: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const userData = await axios.get("/users", {
          headers: { "x-auth-token": localStorage.getItem("auth-token") },
        });
        setUser(userData.data);
      } catch (err) {
        console.log(err.data);
      }
    })();
  }, []);

  const deleteUser = async () => {
    try {
      await axios.delete("/users/delete", {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      history.push("/");
      props.logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <Card className="shadow mt-4">
          <Card.Body>
            <p>Display name: {props.userData.user.displayName}</p>
            <p>Email: {props.userData.user.email}</p>
            <hr />
            <p
              className="del text-danger"
              onClick={() => {
                deleteUser();
              }}
            >
              Delete user
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
