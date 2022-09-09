import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div>
        <div>anyone can see this screen</div>
        {this.props.user._id && <p>logged username: {this.props.user.username}</p>}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
