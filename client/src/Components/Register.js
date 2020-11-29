import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    password: "",
    displayName: "",
  });
  const history = useHistory();

  const onChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/register", register);
      history.push("/confirmation");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <Form onSubmit={submit}>
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
        <Form.Label>Display Name</Form.Label>
        <Form.Control
          name="displayName"
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
      <div className="text-right">
        <Button
          variant="primary shadow-sm"
          disabled={
            register.email &&
            register.password &&
            register.passwordCheck &&
            register.displayName
              ? false
              : true
          }
          type="submit"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default Register;
