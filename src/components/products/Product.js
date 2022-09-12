import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { saveProduct, deleteProduct } from "../../redux/actions/productActions";
import { getCategories } from "../../redux/actions/categoryActions";

import DeletePopUp from "../popup/DeletePopUp";
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
import SelectInput from "../toolbox/SelectInput";
function Product({
  products,
  categories,
  getCategories,
  saveProduct,
  deleteProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [props.product, getCategories, categories.length]);

  function handleSubmit(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push("/");
    });
  }

  function toggle() {
    setModal(!modal);
  }

  function handleDelete() {
    deleteProduct(product).then(() => {
      history.push("/");
    });
    toggle();
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
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
                {product._id !== undefined ? "Güncelle" : "Ekle"}
              </Badge>
            </h1>
          </div>

          <Form className="form" onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="id">Ürün ID</Label>
              <Input
                type="text"
                name="id"
                id="id"
                value={product._id}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Ürün İsmi</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={product.name}
                onChange={handleChange}
              />
            </FormGroup>
            <SelectInput
              name="categoryId"
              label="Kategori"
              value={product.categoryId || ""}
              defaultOption="Kategori Seçiniz"
              options={categories.map((category) => ({
                value: category._id,
                text: category.name,
              }))}
              onChange={handleChange}
            />
            <FormGroup>
              <Label for="price">Fiyat</Label>
              <Input
                type="text"
                name="price"
                id="price"
                value={product.price}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="stock">Stok</Label>
              <Input
                type="text"
                name="stock"
                id="stock"
                value={product.stock}
                onChange={handleChange}
              />
            </FormGroup>
            {product.img ? (
              <FormGroup>
                <Label for="currentImg">Güncel Resim:</Label>
                <img
                  src={product.img}
                  style={{ height: 75, width: 75 }} // loc end item
                  alt="edit"
                  name="currentImg"
                  id="currentImg"
                  className="link-black "
                />
              </FormGroup>
            ) : null}
            <FormGroup>
              <Label for="img">Resim Link</Label>
              <Input
                type="text"
                name="img"
                id="img"
                value={product.img}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Açıklama</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={product.description}
                onChange={handleChange}
              />
            </FormGroup>
            <Button type="submit" color="warning">
              {product._id !== undefined ? "Güncelle" : "Ekle"}
            </Button>{" "}
            {product._id !== undefined ? (
              <Button color="danger" onClick={() => toggle()}>
                Sil
              </Button>
            ) : null}
            <DeletePopUp
              modal={modal}
              toggle={toggle}
              name={product.name}
              handleDelete={handleDelete}
            />
          </Form>
        </Col>
        <Col xs="3"></Col>
      </Row>
    </div>
  );
}

export function getProductById(products, productId) {
  return products.find((product) => product._id === productId) || null;
}

export function getProductAPIById(productId) {
  return fetch(`http://localhost:3000/products/${productId}`)
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

function mapStateToProps(state, ownProps) {
  const productId = ownProps.match.params.id;
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
  deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
