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

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const configuration = {
    method: "post",
    url: "https://moon-backend.afkborn.keenetic.pro/users/register",
    data: {
      email,
      password,
      username,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios(configuration)
      .then((result) => {
        setRegister(true);
        console.log(result);
      })
      .catch((error) => {
        setError(true);
        setMessage(error.response.data.message);
        console.log(error)
      });
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col xs="3"></Col>
        <Col xs="6">
          <Form className="form" onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="passwd">Password</Label>
              <Input
                type="password"
                name="password"
                id="passwd"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>


            <Button onSubmit={(e) => handleSubmit(e)} color="warning">
              Register
            </Button>

            {register ? (
              <p className="text-success">You Are Registered Successfully</p>
            ) : null }
            {error ? <p className="text-danger">{message}</p> : null}
          </Form>
        </Col>
        <Col xs="3"></Col>
      </Row>
    </Container>
  );
}

export default Register;
