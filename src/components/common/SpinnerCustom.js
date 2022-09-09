import React, { Component } from "react";
import { Spinner } from "reactstrap";

export default class SpinnerCustom extends Component {
  render() {
    return (
      <div className="text-center">
        <Spinner
          className="m-5"
          color="danger"
          type="grow"
          style={{
            height: "2.5rem",
            width: "2.5rem",
          }}
        >
          Loading...
        </Spinner>
      </div>
    );
  }
}
