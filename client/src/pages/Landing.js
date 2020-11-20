import React, { useState } from "react";
import { Col, Row, Card, Nav } from "react-bootstrap";

const Landing = () => {
  const styles = {
    card: {
      marginTop: "20px",
    },
  };

  const [landing, setLanding] = useState("login");

  const handleSelect = (eventKey) => setLanding(eventKey);

  return (
    <Row xs={12}>
      <Col xs={{ span: 8, offset: 2 }}>
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
            {landing === "login" ? <h1>login</h1> : <h1>register</h1>}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Landing;
