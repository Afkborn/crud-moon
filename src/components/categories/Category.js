import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { saveCategory } from "../../redux/actions/categoryActions";
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

function Category({ saveCategory, history, ...props }) {
  const [category, setCategory] = useState({ ...props.category });

  // useEffect(() => {
  //   setCategory({ ...props.category });
  // }, [props.category]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(category)
    saveCategory(category).then(() => {
      history.push("/");
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  }

  return (
    <div className="mt-4">
      <Row>
        <Col xs="3"></Col>
        <Col xs="6">
          <div>
            <h1 className="text-center ">
              <Badge color="success">
                {" "}
                {category.name !== undefined ? "Güncelle" : "Ekle"}
              </Badge>
            </h1>
          </div>

          <Form className="form" onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Kategori İsmi</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={category.name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="seoUrl">SEO Url</Label>
              <Input
                type="text"
                name="seoUrl"
                id="seoUrl"
                value={category.seoUrl}
                onChange={handleChange}
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
              <Label for="img">Image URL</Label>
              <Input
                type="text"
                name="img"
                id="img"
                value={category.img}
                onChange={handleChange}
              />
            </FormGroup>
            {/* <FormGroup>
              <Label for="imageFile">File</Label>
              <Input type="file" name="file" id="imageFile" />
              <FormText color="muted">Kategoriye ait resim seçiniz.</FormText>
            </FormGroup> */}

            <Button type="submit" color="warning">
              {category.name !== undefined ? "Güncelle" : "Ekle"}
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
  saveCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
