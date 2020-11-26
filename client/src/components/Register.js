import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import UserContext from "../Context/UserContext";
import axios from "axios";

const Register = () => {
  const [register, setRegister] = useState({});
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const onChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/register", register);
      const loginRes = await axios.post("/users/login", {
        email: register.email,
        password: register.password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/home");
    } catch (err) {
      console.log(err);
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
      <Button variant="primary" className="shadow-sm" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Register;
