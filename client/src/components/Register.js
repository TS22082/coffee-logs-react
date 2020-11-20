import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Register = () => {
  const [register, setRegister] = useState({});

  const onChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  return (
    <Form>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          onChange={onChange}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="userName"
          onChange={onChange}
          type="text"
          placeholder="Enter username"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          name="passwordCheck"
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Register;
