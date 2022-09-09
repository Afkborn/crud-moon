import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import * as spinnerActions from "../../redux/actions/spinnerActions";

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
import SpinnerCustom from "../common/SpinnerCustom";
class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  login = () => {
    this.props.actions.getUser(this.state.username, this.state.password);
    this.props.actions.showSpinner();
    //BURADA KALDIM GİRİŞ YAPILDI İSE ANA SAYFAYA YÖNLENDİR
  };


  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };


  loginCol() {
    return (
      <Form className="form">
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            onChange={this.onChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="pwd">Password</Label>
          <Input
            type="password"
            name="password"
            id="pwd"
            onChange={this.onChangeHandler}
          />
        </FormGroup>
        <Button onClick={() => this.login()} color="success">
          Login
        </Button>
        {this.props.user.message && <p>{this.props.user.message}</p>}
      </Form>
    );
  }

  checkLoading() {
    if (this.props.spinnerStatus) {
      return <SpinnerCustom />;
    } else {
      return this.loginCol();
    }
  }

  render() {
    return (
      <Container fluid className="mt-4">
        <Row>
          <Col xs="3"></Col>
          <Col xs="6">{this.checkLoading()}</Col>
          <Col xs="3"></Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    spinnerStatus: state.spinnerReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUser: bindActionCreators(userActions.getUser, dispatch),
      showSpinner: bindActionCreators(spinnerActions.showSpinner, dispatch),
      hideSpinner: bindActionCreators(spinnerActions.hideSpinner, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
