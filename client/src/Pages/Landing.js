import React, { useState } from "react";
import { Col, Row, Card, Nav } from "react-bootstrap";
import Auth from "../Components/Auth";
import Login from "../Components/Login";
import Register from "../Components/Register";

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
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Card style={styles.card} className="shadow">
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
