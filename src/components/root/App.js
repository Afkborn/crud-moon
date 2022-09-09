import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import React, { Component } from "react";
import Home from "../home/Home";
import Navi from "../navi/Navi";
import Login from "../login/Login";
import Register from "../register/Register";
import "../../styles/App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Profile from "../profile/Profile";
import NotFound from "../common/NotFound";
class App extends Component {
  render() {
    return (
      <Container>
        <Navi user={this.props.user} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
          
        </Switch>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      //   getUser: bindActionCreators(userActions.getUser, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
