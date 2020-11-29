import React from "react";
import { Col, Row, Card } from "react-bootstrap";

const Confirmation = () => {
  return (
    <Row>
      <Col sm={12} md={{ span: 6, offset: 3 }} className="pt-4">
        <Card>
          <Card.Header>
            <h1>Account created!</h1>
          </Card.Header>
          <Card.Body>
            <p>
              You should have been sent an email from us to confirm the account.
              You will not be able to log in until you confirm.
            </p>
            <br />
            <p>Do you need us to resend the confirmation link?</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Confirmation;
