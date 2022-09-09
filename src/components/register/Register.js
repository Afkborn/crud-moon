import React from "react";

import { Button, Container, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";

function Register() {
  return (
    <Container fluid className="mt-4">
      <Row>
        <Col xs="3"></Col>
        <Col xs="6">
          <Form className="form ">
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
              />
            </FormGroup>
            <FormGroup>
              <Label for="passwd">Password</Label>
              <Input
                type="password"
                name="password"
                id="passwd"
                placeholder="********"
              />
            </FormGroup>
            <FormGroup>
              <Label for="repasswd">Re-password</Label>
              <Input
                type="password"
                name="password"
                id="repasswd"
                placeholder="********"
              />
            </FormGroup>

            <Button color="warning">Register</Button>
          </Form>
        </Col>
        <Col xs="3"></Col>
      </Row>
    </Container>
  );
}

export default Register;
