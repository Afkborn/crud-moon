import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  Badge,
} from "reactstrap";
import { getCategories } from "../../redux/actions/categoryActions";

function Category({ category, categories, history, ...props }) {
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, []);

  return (
    <div className="mt-4">
      <Row>
        <Col xs="3"></Col>
        <Col xs="6">
          <div>
            <h1 className="text-center ">
              <Badge color="success">
                {" "}
                {category.name ? category.name : "Ekle"}
              </Badge>
            </h1>
          </div>

          <Form className="form">
            <FormGroup>
              <Label for="name">Kategori İsmi</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={category.name}
                placeholder="Kategori İsmi"
              />
            </FormGroup>
            <FormGroup>
              <Label for="seuUrl">SEO Url</Label>
              <Input
                type="text"
                name="seuUrl"
                id="seuUrl"
                value={category.seoUrl}
                placeholder="SEO Url"
              />
            </FormGroup>
            {category.img ? (
              <FormGroup>
                <Label for="currentImg">Güncel Resim:</Label>
                <img
                  src={category.img}
                  style={{ height: 75, width: 75 }} // loc end item
                  alt="edit"
                  name="currentImg"
                  id="currentImg"
                  className="link-black "
                />
              </FormGroup>
            ) : null}
            <FormGroup>
              <Label for="imageFile">File</Label>
              <Input type="file" name="file" id="imageFile" />
              <FormText color="muted">Kategoriye ait resim seçiniz.</FormText>
            </FormGroup>
            <Button color="warning">
              {category.name ? "Güncelle" : "Ekle"}
            </Button>
          </Form>
        </Col>
        <Col xs="3"></Col>
      </Row>
    </div>
  );
}

export function getCategoryById(categories, id) {
  return categories.find((category) => category._id === id);
}

function mapStateToProps(state, ownProps) {
  const categoryId = ownProps.match.params.id;
  const category =
    categoryId && state.categoryListReducer.length > 0
      ? getCategoryById(state.categoryListReducer, categoryId)
      : {};

  return {
    category,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
