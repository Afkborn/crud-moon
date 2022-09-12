import React, { useState } from "react";

import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const configuration = {
    method: "post",
    url: "/users/login",
    data: {
      email,
      password,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios(configuration)
      .then((result) => {        setLogin(true);
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        window.location.href = "/";
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <Container fluid className="mt-4" onSubmit={(e) => handleSubmit(e)}>
      <Row>
        <Col xs="3"></Col>
        <Col xs="6">
          <Form className="form">
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="pwd">Password</Label>
              <Input
                type="password"
                name="password"
                id="pwd"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button
              onSubmit={(e) => handleSubmit(e)}
              type="submit"
              color="success"
            >
              Login
            </Button>
            {login ? (
              <p className="text-success">You Are Logged in Successfully</p>
            ) : null}
          </Form>
        </Col>
        <Col xs="3"></Col>
      </Row>
    </Container>
  );
}

export default Login;
