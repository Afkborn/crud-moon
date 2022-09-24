import React from "react";
import { Col, Container, Row, Card, Spinner } from "reactstrap";

const ThumbnailContainer = ({ images, spinner, deleteImage }) => {
  return (
    <Container>
      <Row>
        {images.map((image) => (
          <Col xl={4} lg={6} md={6} sm={12} xs={12} key={image._id}>
            <Card outline color="light" className="card-thumbnail mt-2">
              <span
                onClick={() => deleteImage(image)}
                className=" span-right clickable  link-black"
              >
                X
              </span>
              <img
                src={image.file}
                style={{ width: "100%" }}
                alt="edit"
                name="currentImg"
                id="currentImg"
              />
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center">
        {spinner && <Spinner type="grow" color="danger" />}
      </div>
    </Container>
  );
};

export default ThumbnailContainer;
