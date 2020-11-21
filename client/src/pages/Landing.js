import React, { useState } from "react";
import { Col, Row, Card, Nav } from "react-bootstrap";
import Auth from "../components/Auth";
import Login from "../components/Login";
import Register from "../components/Register";

const Landing = () => {
  const styles = {
    card: {
      marginTop: "20px",
    },
  };

  const [landing, setLanding] = useState("login");

  const handleSelect = (eventKey) => setLanding(eventKey);

  return (
    <Auth>
      <Row xs={12}>
        <Col xs={12} md={{ span: 8, offset: 2 }}>
          <Card style={styles.card}>
            <Card.Body>
              <Nav
                variant="tabs"
                defaultActiveKey="login"
                onSelect={handleSelect}
              >
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="register">Register</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
            <Card.Body>
              {landing === "login" ? <Login /> : <Register />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Auth>
  );
};

export default Landing;
