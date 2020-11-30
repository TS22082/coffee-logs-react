import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from "./Context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import Item from "./Pages/Item";
import Landing from "./Pages/Landing";
import { Container } from "react-bootstrap";
import axios from "axios";
import Navigation from "./Components/Navigation";
import ConfirmAccount from "./Pages/ConfirmAccount";
import Confirmation from "./Pages/Confirmation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./Pages/Settings";

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
        <ToastContainer />
        <Navigation userData={userData} logout={logout} />
        <Container>
          <UserContext.Provider value={{ userData, setUserData }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/item/:id" component={Item} />
              <Route path="/settings" component={Settings} />
              <Route path="/confirmation" component={Confirmation} />
              <Route
                path="/confirm_account/:token"
                component={ConfirmAccount}
              />
              <Route path="/" component={Landing} />
            </Switch>
          </UserContext.Provider>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
