import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const CmsMenu = () => {
  const user = useSelector(state => state.user.value);

  return Object.keys(user).length ? (
    <Navbar variant="light" bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          E-commerce
        </Link>
        <Navbar.Toggle></Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Item>
              <Link to="" className="nav-link">
                <i className="fa-solid fa-users me-2"></i>Staffs
              </Link>
            </Nav.Item>
          </Nav>
          <Nav className="mb-2 mb-lg-0">
            <NavDropdown
              title={
                <>
                  <i className="fa-solid fa-user-circle me-2"></i>Demo User
                </>
              }
              id="basic-nav-dropdown"
              align="end">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : null;
};
