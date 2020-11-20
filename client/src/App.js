import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { Navbar, Nav, Container } from "react-bootstrap";

function App() {
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
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" component={Landing} />
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
