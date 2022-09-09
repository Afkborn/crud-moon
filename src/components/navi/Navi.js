import React, { Component } from "react";
import { Nav, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

export default class Navi extends Component {
  componentDidMount() {
    console.log(this.props.user._id);
  }
  renderProfile = () => {
    return (
      <Row>
        <Col md="6" sm="2" lg="8"></Col>
        <Col xs="5" sm="4" md="3" lg="2">
        </Col>
        <Col xs="5" sm="4" md="3" lg="2">
          <Link to="/profile" className="link-black">
            Profile
          </Link>
        </Col>
      </Row>
    );
  };
  renderBasic = () => {
    return (
      <Row>
      <Col md="6" sm="2" lg="8"></Col>
      <Col xs="5" sm="4" md="3" lg="2">
        <Link to="/login" className="link-black">
          Login
        </Link>
      </Col>
      <Col xs="5" sm="4" md="3" lg="2">
        <Link to="/register" className="link-black">
          Register
        </Link>
      </Col>
    </Row>
    )
  }

  render() {
    return (
      <Container fluid className="mt-4">
        <Row>
          <Col xs="3">
            <Nav className="me-auto"></Nav>
          </Col>
          <Col xs="6" className="text-center ">
            <Link to="/" className="link-black brand">
              Moon
            </Link>
          </Col>
          <Col xs="3">
            {this.props.user._id==undefined ? this.renderBasic() : this.renderProfile()}
          </Col>
        </Row>
      </Container>
    );
  }
}
