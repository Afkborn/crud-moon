import React from "react";
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  CardTitle,
  Spinner,
} from "reactstrap";

const ThumbnailContainer = ({ images, spinner, deleteImage }) => {
  return (
    <Container>
      <Row>
        {images.map((image) => (
          <Col
            xl={4}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            key={image._id}
            className=""
          >
            <Card outline color="light" className="">
              <span onClick={() => deleteImage(image)} className=" clickable big-span link-black">
                X
              </span>
              <img
                src={image.file}
                style={{ height: 200, width: 200 }}
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
