import React from "react";
import { Row, Col } from "reactstrap";
import CategoryList from "../categories/CategoryList";
import ProductList from "../products/ProductList";
function Home() {
  return (
    <div>
    <Row>
      <Col xs="3">
        <CategoryList></CategoryList>
      </Col>
      <Col xs="9">
        <ProductList></ProductList>
      </Col>
    </Row>
  </div>
  );
}

export default Home;
