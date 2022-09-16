import React from "react";
import { Container, Row } from "reactstrap";
import ColDashboard from "../toolbox/ColDashboard";
import { useHistory } from "react-router-dom";

function TabDashboard({ setActiveTab }) {
  const history = useHistory();
  function toLogoutPage() {
    history.push("/logout");
  }
  return (
    <div className="text-center">
      <Container>
        <Row xs={1} sm={1} md={2} lg={3}>
          <ColDashboard
            cardTitle={"Account"}
            imgSrc={"https://www.svgrepo.com/show/361411/account.svg"}
            cardText={"Your membership information"}
            onClick={() => setActiveTab("1")}
          ></ColDashboard>
          <ColDashboard
            cardTitle={"Orders"}
            imgSrc={"https://www.svgrepo.com/show/257419/list-order.svg"}
            cardText={"Order information you receive"}
            onClick={() => setActiveTab("2")}
          ></ColDashboard>
          <ColDashboard
            cardTitle={"Comments"}
            imgSrc={"https://www.svgrepo.com/show/357540/comment.svg"}
            cardText={"Reviews of your products"}
            onClick={() => setActiveTab("3")}
          ></ColDashboard>
          <ColDashboard
            cardTitle={"Log Out"}
            imgSrc={"https://www.svgrepo.com/show/326699/log-out-outline.svg"}
            cardText={"See you again"}
            onClick={() => toLogoutPage() } //to /logout
          ></ColDashboard>
        </Row>
      </Container>
    </div>
  );
}

export default TabDashboard;
