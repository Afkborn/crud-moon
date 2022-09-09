import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import React from "react";
import Home from "../home/Home";
import Navi from "../navi/Navi";
import Login from "../login/Login";
import Register from "../register/Register";
import "../../styles/App.css";

function App() {
  return (
    <Container>
      <Navi/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Container>
  );
}

export default App;
