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
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [name , setName] = useState("");
  const [surname , setSurname] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const configuration = {
    method: "post",
    url: "/users/register",
    data: {
      email,
      password,
      name,
      surname
    },
  };

  const handleSubmit = (e) => {
    setError(false);
    setMessage("");
    setRegister(false);
    e.preventDefault();
    if (!validateForm()) {
      setMessage("Please fill all fields");
      setError(true);
      return;
    }
    axios(configuration)
      .then((result) => {
        setRegister(true);
        window.location.href = "/"; 
        // TODO SET EMAİL TO LOGIN PAGE
      })
      .catch((error) => {
        setError(true);
        let errorCode = error.response.data.error.code;
        if (errorCode === 11000) {
          setMessage("Email or username already exists");
        } else {
          setMessage(`Something wrong! (${errorCode})`);
        }
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setMessage("");
    setError(false);
  }


  function validateForm() {
    //name and surname must be added, and length must be checked
    if (name.length < 3 || surname.length < 3) {
      return false;
    }
    //check email
    if (email.length < 5) {
      return false;
    }
    //check password
    if (password.length < 5) {
      return false;
    }
    return true;
  }

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col xs="3"></Col>
        <Col xs="6">
          <Form className="form" onSubmit={(e) => handleSubmit(e)}  onChange={handleChange}>
            <FormGroup className="side-by-side">
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="First Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <Label for="surname">Surname</Label>
              <Input
                type="text"
                name="surname"
                id="surname"
                required
                placeholder="Last Name"
                onChange={(e) => setSurname(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                required
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
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <Button onSubmit={(e) => handleSubmit(e)} color="warning">
              Register
            </Button>

            {register ? (
              <p className="text-success">You Are Registered Successfully</p>
            ) : null}
            {error ? <p className="text-danger">{message}</p> : null}
          </Form>
        </Col>
        <Col xs="3"></Col>
      </Row>
    </Container>
  );
}

export default Register;
