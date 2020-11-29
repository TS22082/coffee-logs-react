import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";
import { toast } from "react-toastify";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
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

  return (
    <Form onSubmit={submit}>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          onChange={onChange}
          className={
            !validEmail(login.email) ? "border-danger" : "border-success"
          }
          type="email"
          placeholder="Enter email"
        />

        {!validEmail(login.email) ? (
          <small class="form-text text-muted">Needs to be a valid email.</small>
        ) : null}
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          onChange={onChange}
          type="password"
          className={
            !validPassword(login.password) ? "border-danger" : "border-success"
          }
          placeholder="Password"
        />
        {!validPassword(login.password) ? (
          <small class="form-text text-muted">
            Needs to be greater than 7 characters long.
          </small>
        ) : (
          <small class="form-text text-muted">Checks out!</small>
        )}
      </Form.Group>
      <div className="text-right">
        <Button
          variant="primary shadow-sm"
          disabled={
            validEmail(login.email) && validPassword(login.password)
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

export default Login;
