import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserDetails } from "../../redux/actions/userActions";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import TabDashboard from "./TabDashboard";
import TabAccount from "./TabAccount";
import TabOrders from "./TabOrders";
import TabComments from "./TabComments";

// import Cookies from "universal-cookie";
// const cookies = new Cookies();
// const token = cookies.get("TOKEN");

function ProfileDashboard({ user, getUserDetails, ...props }) {
  const [activeTab, setActiveTab] = useState("0");
  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  const navLinkStyle = {
    cursor: "pointer",
    backgroundColor: "#f8f9fa",
    color: "#495057",
  }
  const activeNavLinkStyle = {
    cursor: "pointer",
    backgroundColor: "#e9ecef",
    color: "#bd1f1f",
  }
  return (
    <div className="mt-5">
      <div>
        <h1 hidden={activeTab === "0" ? false : true} className="m-2" >My Account</h1>
        <Nav hidden={activeTab === "0" ? true : false} tabs pills justified>
          <NavItem>
            <NavLink
              className={activeTab === "1" ? "active" : "" }
              onClick={() => setActiveTab("1")}
              style={activeTab === "1" ? activeNavLinkStyle : navLinkStyle}
            >
              <h5 className="navTabText">Account</h5>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === "2" ? "active" : ""}
              onClick={() => setActiveTab("2")}
              style={activeTab === "2" ? activeNavLinkStyle : navLinkStyle}
            >
              <h5>Orders</h5>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === "3" ? "active" : ""}
              onClick={() => setActiveTab("3")}
              style={activeTab === "3" ? activeNavLinkStyle : navLinkStyle}
            >
              <h5>Comments</h5>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="0"><TabDashboard setActiveTab={setActiveTab}/></TabPane>
          <TabPane tabId="1"><TabAccount/></TabPane>
          <TabPane tabId="2"><TabOrders/></TabPane>
          <TabPane tabId="3"><TabComments/></TabPane>
        </TabContent>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDashboard);
