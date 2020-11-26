import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import UserContext from "./Context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Item from "./pages/Item";
import Landing from "./pages/Landing";
import { Navbar, Nav, Container } from "react-bootstrap";
import axios from "axios";
import Navigation from "./components/Navigation";

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

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation */}
        <Navigation userData={userData} logout={logout} />
        {/* Main Content */}
        <Container>
          <UserContext.Provider value={{ userData, setUserData }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/edit/:id" component={Edit} />
              <Route path="/item/:id" component={Item} />
              <Route path="/" component={Landing} />
            </Switch>
          </UserContext.Provider>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
