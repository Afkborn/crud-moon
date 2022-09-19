import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { saveProduct, deleteProduct } from "../../redux/actions/productActions";
import { showSpinner, hideSpinner } from "../../redux/actions/spinnerActions";
import { getCategories } from "../../redux/actions/categoryActions";

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
  FormText,
  Spinner,
} from "reactstrap";
import SelectInput from "../toolbox/SelectInput";
import axios from "axios";
import alertify from "alertifyjs";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

//TODO LİST
// fotoğraf upload ederken ekle veya güncelle tuşuna basılmasın.
// moon user ekranında picture görüntüleme işlemini yap
// database için thumnbail eklemeyi bul, image upload edildiğinde aynı şekilde thumnbail oluştursun, oluşturulan thumnbaile /media/thumbnail/ şeklinde erişilebilsin
// REST API doc güncelemesi yap

function Product({
  products,
  categories,
  getCategories,
  saveProduct,
  deleteProduct,
  spinner,
  showSpinner,
  hideSpinner,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [modal, setModal] = useState(false);
  const [img, setImg] = useState();
  const oldProduct = { ...props.product };
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, [props.product, getCategories, categories.length]);

  // bootstrap required yeterli şimdilik.
  // function validateForm() {
  //   console.log(product)
  //   if (product.name === undefined || product.name === "") {
  //     alertify.error("Name is required");
  //     return false;
  //   }
  //   if (product.categoryId === undefined || product.categoryId === "") {
  //     alertify.error("Category is required");
  //     return false;
  //   }
  //   if (product.price === undefined || product.price === "") {
  //     alertify.error("Price is required");
  //     return false;
  //   }
  //   if (product.stock === undefined || product.stock === "") {
  //     alertify.error("Stock is required");
  //     return false;
  //   }
  //   if (product.imageId === undefined || product.imageId === "") {
  //     alertify.error("Image is required");
  //     return false;
  //   }
  //   return true;
  // }


  function compareProduct() {
    if (product.name === oldProduct.name &&
      product.categoryId === oldProduct.categoryId &&
      product.price === oldProduct.price &&
      product.stock === oldProduct.stock &&
      product.imageId === oldProduct.imageId) {
      return true;
    }
    return false;
  }

  function handleSubmit(event) {
    event.preventDefault();
    // if (!validateForm()) return;
    if (isUploading) {
      alertify.notify("Fotoğraf yükleniyor, lütfen bekleyin", "warning", 5);
      return;
    }
    if (compareProduct()) {
      alertify.notify("Değişiklik yapılmadı", "warning", 5);
      return;
    }


    saveProduct(product).then(() => {
      history.push("/");
    });
  }

  const onImageChange = (e) => {
    setIsUploading(true);
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
    showSpinner();
    const newMedia = new FormData();
    newMedia.append("image", file);
    newMedia.append("imageType", "main");
    axios
      .post("/upload", newMedia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setProduct({ ...product, imageId: result.data._id });
        hideSpinner();
        setIsUploading(false);
      });
  };

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
            {product._id !== undefined ? (
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
            ) : null}
            <FormGroup>
              <Label for="name">Ürün İsmi</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <SelectInput
              name="categoryId"
              label="Kategori"
              value={product.categoryId || ""}
              defaultOption="Kategori Seçiniz"
              required={true}
              options={categories.map((category) => ({
                value: category._id,
                text: category.name,
              }))}
              onChange={handleChange}
            />
            <FormGroup>
              <Label for="price">Fiyat</Label>
              <Input
                type="number"
                name="price"
                id="price"
                required
                value={product.price}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="stock">Stok</Label>
              <Input
                type="number"
                name="stock"
                id="stock"
                required
                value={product.stock}
                onChange={handleChange}
              />
            </FormGroup>
            {oldProduct.imageId ? (
              <FormGroup>
                <Label for="currentImg">Eski Resim:</Label>
                <img
                  src={"/media/main/" + oldProduct.imageId}
                  style={{ height: 75, width: 75 }}
                  alt="edit"
                  name="currentImg"
                  id="currentImg"
                  className="link-black "
                />
              </FormGroup>
            ) : null}
            <FormGroup>
              <Label for="exampleFile">Dosya</Label>
              <Input
                type="file"
                name="file"
                accept=".png"
                id="exampleFile"
                onChange={onImageChange}
              />
              <FormText color="muted">
                Resim yüklemek için lütfen dosya seçiniz. (max 2MB, PNG)
              </FormText>
            </FormGroup>
            {img ? (
              spinner ? (
                <div className="text-center">
                  {spinner && <Spinner type="grow" color="danger" />}
                </div>
              ) : (
                <FormGroup>
                  <Label for="currentImg">Yeni Resim:</Label>
                  <img
                    src={img}
                    style={{ height: 75, width: 75 }}
                    alt="edit"
                    name="currentImg"
                    id="currentImg"
                    className="link-black "
                  />
                </FormGroup>
              )
            ) : null}
            <FormGroup>
              <Label for="description">Açıklama</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={product.description}
                onChange={handleChange}
                required
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
    spinner: state.spinnerReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
  deleteProduct,
  showSpinner,
  hideSpinner,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
