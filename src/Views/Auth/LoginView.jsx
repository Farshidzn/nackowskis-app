import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { login } from "../../contexts/Auth/AuthActions";
import AuthContext from "../../contexts/Auth/AuthContext";
const LoginView = () => {
  const { dispatch, error, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { username, password } = formData;
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    // check if user is loggedIn
    console.log("user");
    console.log(user);

    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    login(formData, dispatch);
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Logga In</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleOnSubmit}>
            <Form.Group>
              <Form.Label>Användarnamn</Form.Label>
              <Form.Control
                type="text"
                placeholder="användarnamn"
                value={username}
                id="username"
                onChange={handleOnChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Lösenord</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="**********"
                id="password"
                onChange={handleOnChange}
              ></Form.Control>
            </Form.Group>
            <Button className="my-2" type="submit" variant="primary">
              Sign In
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Ny Kund?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Regristrera
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginView;
