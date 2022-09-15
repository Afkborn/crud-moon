import React, { useState } from "react";
import { connect } from "react-redux";
import {
  saveCategory,
  deleteCategory,
} from "../../redux/actions/categoryActions";
import DeletePopUp from "../toolbox/DeletePopUp";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Badge,
} from "reactstrap";

function Category({ saveCategory, deleteCategory, history, ...props }) {
  const [category, setCategory] = useState({ ...props.category });
  const [modal, setModal] = useState(false);

  // fıx WARNING A COMPONENT IS CHANING AN UNCONTROLLED INPUT TO BE CONTROLLED

  function handleSubmit(event) {
    event.preventDefault();
    saveCategory(category).then(() => {
      history.push("/");
    });
  }

  function toggle() {
    setModal(!modal);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  }
  function handleDelete() {
    deleteCategory(category).then(() => {
      history.push("/");
    });
    toggle();
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
                {category._id !== undefined ? "Güncelle" : "Ekle"}
              </Badge>
            </h1>
          </div>

          <Form className="form" onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="id">Kategori ID</Label>
              <Input
                type="text"
                name="id"
                id="id"
                value={category._id}
                disabled
              />
            </FormGroup>
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
            <Button type="submit" color="warning">
              {category._id !== undefined ? "Güncelle" : "Ekle"}
            </Button>{" "}
            {category._id !== undefined ? (
              <Button color="danger" onClick={() => toggle()}>
                Sil
              </Button>
            ) : null}
            <DeletePopUp
              modal={modal}
              toggle={toggle}
              name={category.name}
              handleDelete={handleDelete}
            />
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
  deleteCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
