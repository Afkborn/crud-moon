import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import React, { Component } from "react";
import Home from "../home/Home";
import Navi from "../navi/Navi";
import Login from "../login/Login";
import Register from "../register/Register";
import "../../styles/App.css";
import Logout from "../login/Logout";
import { connect } from "react-redux";
import Profile from "../profile/Profile";
import NotFound from "../common/NotFound";
import ProtectedRoutes from "../common/ProtectedRoutes";
import Category from "../categories/Category";
import Product from "../products/Product";
class App extends Component {
  render() {
    return (
      <Container>
        <Navi user={this.props.user} />
        <Switch>
          <ProtectedRoutes path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoutes path="/profile" component={Profile} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoutes path="/category/:id" component={Category} />
          <ProtectedRoutes path="/category" component={Category} />
          <ProtectedRoutes path="/product/:id" component={Product} />
          <ProtectedRoutes path="/product" component={Product} />
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
