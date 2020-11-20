import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from "./Context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { Navbar, Nav, Container } from "react-bootstrap";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");

    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }

    const tokenRes = await axios.post("/users/tokenIsValid", null, {
      headers: { "x-auth-token": token },
    });

    if (tokenRes.data) {
      const userRes = await axios.get("/users/", {
        headers: { "x-auth-token": token },
      });

      setUserData({
        token,
        user: userRes.data,
      });
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">Coffee Logs</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* Main Content */}
        <Container>
          <UserContext.Provider value={{ userData, setUserData }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/" component={Landing} />
            </Switch>
          </UserContext.Provider>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
