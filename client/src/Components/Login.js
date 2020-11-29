import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";
import { toast } from "react-toastify";

const Login = () => {
  const [login, setLogin] = useState({});
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const onChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginRes = await axios.post("/users/login", {
        email: login.email,
        password: login.password,
      });

      if (!loginRes.data.user.confirmed) {
        history.push("/confirmation");
      } else {
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
        });

        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
      }
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
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
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

export default Login;
