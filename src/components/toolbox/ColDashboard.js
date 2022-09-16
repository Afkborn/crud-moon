import React from "react";
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
const ColDashboard = ({ cardTitle, imgSrc, cardText, onClick }) => {
  return (
    <Col>
      <div className="mt-2">
        <Card onClick={onClick} className="clickable ">
          <CardBody>
            <CardTitle className="p-2" tag="h5">
              {cardTitle}{" "}
              <img
                alt="account"
                src={imgSrc}
                width={60}
                height={60}
                className="to-left"
              />
            </CardTitle>
            <CardText className="p-2">{cardText}</CardText>
          </CardBody>
        </Card>
      </div>
    </Col>
  );
};

export default ColDashboard;
