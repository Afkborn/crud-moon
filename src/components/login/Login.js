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
  Spinner,
} from "reactstrap";
import axios from "axios";
import Cookies from "universal-cookie";

import { showSpinner, hideSpinner } from "../../redux/actions/spinnerActions";
import { connect } from "react-redux";

const cookies = new Cookies();

function Login({ spinner, showSpinner, hideSpinner, history, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const configuration = {
    method: "post",
    url: "/users/login",
    data: {
      email,
      password,
    },
  };

  const handleSubmit = (e) => {
    showSpinner();
    e.preventDefault();
    if (!validateForm()) {
      setMessage("Please fill all fields");
      setError(true);
      return;
    }
    axios(configuration)
      .then((result) => {
        setLogin(true);
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        hideSpinner();
        window.location.href = "/";
      })
      .catch((error) => {
        setError(true);
        console.log(error);
        setMessage("Email or password is wrong");
        hideSpinner();
      });
  };

  const handleChange = (e) => {
    setMessage("");
    setError(false);
  };

  function validateForm() {
    //check email length
    if (email.length < 5 || email.length > 50) {
      return false;
    }
    //check password length
    if (password.length < 5 || password.length > 50) {
      return false;
    }
    return true;
  }

  return (
    <Container fluid className="mt-4" onSubmit={(e) => handleSubmit(e)}>
      <Row>
        <Col xs="3"></Col>
        <Col xs="6">
          <Form className="form" onChange={handleChange}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                required
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
                required
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
            {error ? <p className="text-danger">{message}</p> : null}
          </Form>
          <div className="text-center">
            {spinner && <Spinner type="grow" color="danger" />}
          </div>
        </Col>
        <Col xs="3"></Col>
      </Row>
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    spinner: state.spinnerReducer,
  };
}

const mapDispatchToProps = {
  showSpinner,
  hideSpinner,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
