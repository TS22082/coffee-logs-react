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

  const validEmail = (str) => {
    if (str.includes("@") && str.includes(".com")) {
      return true;
    }
    return false;
  };

  const validPassword = (str) => {
    if (str.length >= 8) {
      return true;
    }

    return false;
  };

  const validateCheck = () => {
    if (
      register.password.length > 0 &&
      register.password === register.passwordCheck
    ) {
      return true;
    }
    return false;
  };

  return (
    <Form onSubmit={submit}>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          onChange={onChange}
          className={
            !validEmail(register.email) ? "border-danger" : "border-success"
          }
          type="email"
          placeholder="Enter email"
        />
        {!validEmail(register.email) ? (
          <Form.Text className="text-muted">
            Needs to be a valid email.
          </Form.Text>
        ) : (
          <Form.Text className="text-muted">Checks out!</Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Display Name</Form.Label>
        <Form.Control
          name="displayName"
          onChange={onChange}
          className={
            !register.displayName.length > 0
              ? "border-danger"
              : "border-success"
          }
          type="text"
          placeholder="Enter username"
        />
        {!register.displayName.length > 0 ? (
          <Form.Text className="text-muted">Can not be empty.</Form.Text>
        ) : (
          <Form.Text className="text-muted">Checks out!</Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          onChange={onChange}
          className={
            !validPassword(register.password)
              ? "border-danger"
              : "border-success"
          }
          type="password"
          placeholder="Password"
        />
        {!validPassword(register.password) ? (
          <Form.Text className="text-muted">
            Needs to be greater than 7 characters long.
          </Form.Text>
        ) : (
          <Form.Text className="text-muted">Checks out!</Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          name="passwordCheck"
          onChange={onChange}
          className={!validateCheck() ? "border-danger" : "border-success"}
          type="password"
          placeholder="Password"
        />
        {!validateCheck() ? (
          <Form.Text className="text-muted">Passwords must match.</Form.Text>
        ) : (
          <Form.Text className="text-muted">Checks out!</Form.Text>
        )}
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
