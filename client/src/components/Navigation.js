import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = (props) => {
  const history = useHistory();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        <Link className="navbar-brand" to="/">
          Coffee Logs
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {props.userData.user ? (
            <>
              <Nav.Link
                onClick={() => {
                  history.push("/home");
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  props.logout();
                  history.push("/");
                }}
              >
                Sign Out
              </Nav.Link>
            </>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
