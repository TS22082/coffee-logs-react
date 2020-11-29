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
      {props.userData.user ? (
        <>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link
                onClick={() => {
                  props.logout();
                  history.push("/");
                }}
              >
                Sign Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      ) : null}
    </Navbar>
  );
};

export default Navigation;
