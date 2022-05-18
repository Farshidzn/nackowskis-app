import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import AuthContext from "../../contexts/Auth/AuthContext";
import { logout } from "../../contexts/Auth/AuthActions";

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);
  const logoutHandler = () => {
    logout(dispatch);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <LinkContainer to="/">
              <Nav.Link>Nackowskis</Nav.Link>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <LinkContainer to="/">
                <Nav.Link>
                  <strong>Hem</strong>
                </Nav.Link>
              </LinkContainer>
             
              {user ? (
                 <>
                 <LinkContainer to="/upsert">
                 <Nav.Link>Skapa auktion</Nav.Link>
               </LinkContainer>
                <NavDropdown title={user.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Min Profil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    Sign In <FaUserAlt />
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
