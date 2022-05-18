import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import { register } from "../../contexts/Auth/AuthActions";
import AuthContext from "../../contexts/Auth/AuthContext";
const RegisterView = () => {
  const { user, error, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    comfirmPassword: "",
  });
  const { username, password, comfirmPassword } = formData;
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
    return () => {};
  }, [navigate, redirect, user]);
  const onSubmitHandler = (e) => {
    console.log(password);
    console.log(comfirmPassword);
    e.preventDefault();
    if (password !== comfirmPassword) {
      setMessage("Passwords do not match");
    } else {
      const registerDto = {
        username: username,
        password: password,
      };
      console.log(registerDto);
      register(registerDto, dispatch);
    }
  };
  const onChange = (e) => {
    // const { id, value } = e.target;
    // setFormData((prevState) => ({
    //   ...prevState.formData,
    //   [id]: value,
    // }));
    console.log("change");
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Skapa ett konto</h1>
          {message && <Alert variant="danger">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={onSubmitHandler} autoComplete="off">
            <Form.Group>
              <Form.Label>Namn</Form.Label>
              <Form.Control
                type="text"
                placeholder="Skriv in ditt namn"
                id="username"
                value={username}
                onChange={onChange}
                autoComplete="off"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Lösenord</Form.Label>
              <Form.Control
                type="password"
                id="password"
                value={password}
                onChange={onChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Bekräfta lösenord</Form.Label>
              <Form.Control
                type="password"
                id="comfirmPassword"
                value={comfirmPassword}
                onChange={onChange}
              ></Form.Control>
            </Form.Group>
            <Button className="my-2" type="submit" variant="primary">
              Skapa
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          Redan medlem?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Logga in
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterView;
