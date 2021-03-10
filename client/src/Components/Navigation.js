import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { MdExitToApp, MdHome, MdSettings } from "react-icons/md";

const Navigation = (props) => {
  const history = useHistory();

  const iconStyle = {
    height: "30px",
    width: "30px",
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link className="navbar-brand" to="/home">
        <h4>Coffee Logs</h4>
      </Link>

      {props.userData.user ? (
        <>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link
                onClick={() => {
                  history.push("/home");
                }}
              >
                <MdHome style={iconStyle} />
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  history.push("/settings");
                }}
              >
                <MdSettings style={iconStyle} />
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  props.logout();
                  history.push("/");
                }}
              >
                <MdExitToApp style={iconStyle} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      ) : null}
    </Navbar>
  );
};

export default Navigation;
