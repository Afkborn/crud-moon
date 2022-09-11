import React, { Component } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Logout extends Component {
  componentDidMount() {
    cookies.remove("TOKEN");
    window.location.href = "/";
  }
  render() {
    return <div></div>;
  }
}
