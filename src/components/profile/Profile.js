import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserDetails } from "../../redux/actions/userActions";
import { Badge } from "reactstrap";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

function Profile({ user, getUserDetails, ...props }) {
  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);
  return (
    <div>
      <h2 className="text-center">
        <Badge color="info">Profil</Badge>{" "}
      </h2>
      <div className="text-center">
        <h1>
          <Badge color="secondary">{user._id}</Badge>
        </h1>
        <h1>
          <Badge color="secondary">{user.email}</Badge>
        </h1>
        <h6>
        {token}
        </h6>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
  };
}

const mapDispatchToProps = {
  getUserDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
