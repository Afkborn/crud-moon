import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import {
  saveProduct,
  deleteProduct,
  addProduct,
} from "../../redux/actions/productActions";
import { showSpinner, hideSpinner } from "../../redux/actions/spinnerActions";
import { getCategories } from "../../redux/actions/categoryActions";
import AddStockPopUp from "../toolbox/AddStockPopUp";
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
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import SelectInput from "../toolbox/SelectInput";
import ThumbnailContainer from "../toolbox/ThumbnailContainer";
import { TwitterPicker } from "react-color";
import axios from "axios";
import alertify from "alertifyjs";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");


//TODO LIST
// productList ve categoryList reducerlarında güncelleme olduğunda yansıt
// değişikliği sunucuya gönder response 200 ise reducerdan değişiklik yap
// her seferonde product list, category list ve product listi çekmek yerine reducerdan çek

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
  productImages,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [modal, setModal] = useState(false);
  const [modalAddStock, setModalAddStock] = useState(false);
  const [showcaseImg, setShowcaseImg] = useState();
  const [images, setImages] = useState([]);
  const [imageSpinner, setImageSpinner] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const oldProduct = { ...props.product };
  const [isUploading, setIsUploading] = useState(false);
  const [stockList, setStockList] = useState([]);
  const [stockCount, setStockCount] = useState(0);

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    if (product.imageIds.length > 0 && images.length === 0) {
      setImages(productImages);
    }
    if (stockList.length === 0) {
      setStockList(props.product.stockList);
      setStockCount(props.product.totalStock);

    }
  }, [
    props,
    getCategories,
    categories.length,
    images.length,
    product.imageIds.length,
    productImages,
    stockList.length,
  ]);

  // daha iyi bir yöntem var mı kontrol et
  function compareProduct() {
    if (
      product.name === oldProduct.name &&
      product.categoryId === oldProduct.categoryId &&
      product.price === oldProduct.price &&
      product.showcaseImageId === oldProduct.showcaseImageId &&
      product.description === oldProduct.description &&
      product.imageIds === oldProduct.imageIds &&
      product.color === oldProduct.color &&
      product.gender === oldProduct.gender &&
      product.totalStock === oldProduct.totalStock &&
      product.inStock === oldProduct.inStock &&
      product.stockList === oldProduct.stockList
    ) {
      return true;
    }
    return false;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isUploading) {
      alertify.notify("Fotoğraf yükleniyor, lütfen bekleyin", "warning", 5);
      return;
    }
    if (compareProduct()) {
      alertify.notify("Değişiklik yapılmadı", "warning", 5);
      return;
    }
    if (product.gender === "") {
      alertify.notify("Cinsiyet seçilmeli", "warning", 5);
      return;
    }
    if (stockList.length === 0) {
      alertify.notify("Stok eklenmeli", "warning", 5);
      return;
    }
    if (product.color === "") {
      alertify.notify("Renk seçilmeli", "warning", 5);
      return;
    }
    if (product.showcaseImageId === "") {
      alertify.notify("Vitrin fotoğrafı seçilmeli", "warning", 5);
      return;
    }

    saveProduct(product).then(() => {
      addProduct(product);
      history.push("/");
    });
  }

  const showcaseOnImageChange = (e) => {
    setIsUploading(true);
    const [file] = e.target.files;
    setShowcaseImg(URL.createObjectURL(file));
    showSpinner();
    const newMedia = new FormData();
    newMedia.append("image", file);
    axios
      .post("/upload", newMedia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setProduct({ ...product, showcaseImageId: result.data._id });
        hideSpinner();
        setIsUploading(false);
      });
  };

  const imageOnImageChange = (e) => {
    if (imageCount === 5) {
      alertify.notify("En fazla 5 fotoğraf yükleyebilirsiniz", "warning", 5);
      return;
    }
    setIsUploading(true);
    setImageSpinner(true);
    const [file] = e.target.files;
    const newMedia = new FormData();
    newMedia.append("image", file);
    axios
      .post("/upload", newMedia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setImages((images) => [
          ...images,
          { _id: result.data._id, file: URL.createObjectURL(file), imageCount },
        ]);
        setProduct((product) => ({
          ...product,
          imageIds: [...product.imageIds, result.data._id],
        }));

        setIsUploading(false);
        setImageSpinner(false);
        setImageCount(imageCount + 1);
      });
  };

  function deleteImage(image) {
    setImages(images.filter((img) => img._id !== image._id));
    const newImageIds = product.imageIds.filter((id) => id !== image._id);
    setProduct({ ...product, imageIds: newImageIds });
    axios
      .delete(`/media/${image._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {});
  }

  function toggle() {
    setModal(!modal);
  }

  function toggleAddStock() {
    setModalAddStock(!modalAddStock);
  }

  function handleDelete() {
    deleteProduct(product).then(() => {
      history.push("/");
    });
    toggle();
  }

  const handleChangeComplete = (color, event) => {
    setProduct({ ...product, color: color.hex });
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }

  function handleAddStock(stock) {
    if (stockList.find((s) => s.size === stock.size)) {
      alertify.notify("Bu beden için stok zaten var", "warning", 5);
      return;
    }
    setStockList((prevStockList) => [...prevStockList, stock]);

    //list gibi verilerde prev kullanarka anlık güncelleyebiliyorum fakat bunu çözemedim araştır.
    const newStockCount = stockCount + stock.count;
    setStockCount(newStockCount);
    const stockIsAvaible = newStockCount > 0;


    setProduct((prev) => ({
      ...prev,
      stockList: [...prev.stockList, stock],
      inStock: stockIsAvaible,
      totalStock: newStockCount,
    }));
  }

  function handleStockDelete(stock) {
    setStockList((prev) => prev.filter((s) => s.size !== stock.size));
    const newStockCount = stockCount - stock.count;
    setStockCount(newStockCount);
    const stockIsAvaible = newStockCount > 0;

    setProduct((prev) => ({
      ...prev,
      stockList: prev.stockList.filter((s) => s.size !== stock.size),
      inStock: stockIsAvaible,
      totalStock: newStockCount,
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
            {/* oldProduct showcaseImageId */}
            <FormGroup>
              <div className="text-center ">
                {oldProduct.showcaseImageId ? (
                  <FormGroup>
                    <img
                      src={
                        "/media/" +
                        oldProduct.showcaseImageId +
                        "?type=thumbnail"
                      }
                      style={{ height: 200, width: 200 }}
                      alt="edit"
                      name="currentImg"
                      id="currentImg"
                      className="link-black "
                    />
                  </FormGroup>
                ) : null}
              </div>
            </FormGroup>
            {/* product id */}
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
            {/* product name */}
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
            {/* product category */}
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
            {/* product gender */}
            <FormGroup tag="fieldset">
              <Label>Cinsiyet</Label>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="gender"
                    value="men"
                    onChange={handleChange}
                    checked={product.gender === "men"}
                  />{" "}
                  Erkek
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="gender"
                    value="woman"
                    onChange={handleChange}
                    checked={product.gender === "woman"}
                  />{" "}
                  Kadın
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="gender"
                    value="unisex"
                    onChange={handleChange}
                    checked={product.gender === "unisex"}
                  />{" "}
                  Unisex
                </Label>
              </FormGroup>
            </FormGroup>
            {/* product price */}
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
            {/* product stock */}
            <FormGroup>
              <Label> Stok Bilgisi </Label>{" "}
              <Button onClick={() => toggleAddStock()}>Stok Ekle</Button>
              {stockList.length > 0 ? (
                <ListGroup>
                  {stockList.map((stock) => (
                    <ListGroupItem key={stock.size}>
                      <Row>
                        <Col xs="6">
                          <span> Size: {stock.size}</span>
                        </Col>
                        <Col xs="3">
                          <span> Count: {stock.count} </span>
                        </Col>
                        <Col xs="3">
                          <span
                            className="to-right clickable link-black"
                            onClick={() => handleStockDelete(stock)}
                          >
                            X
                          </span>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              ) : null}
              <AddStockPopUp
                modal={modalAddStock}
                toggle={toggleAddStock}
                handleAddStock={handleAddStock}
              />
            </FormGroup>
            {/* product showcasePhoto */}
            <FormGroup>
              <Label for="showcasePhoto">Vitrin Fotoğrafı</Label>
              <Input
                type="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                id="showcasePhoto"
                onChange={showcaseOnImageChange}
              />
              <FormText color="muted">
                Vitrin fotoğrafı için lütfen dosya seçiniz.
              </FormText>
            </FormGroup>
            {showcaseImg ? (
              spinner ? (
                <div className="text-center">
                  {spinner && <Spinner type="grow" color="danger" />}
                </div>
              ) : (
                <div className="text-center ">
                  <FormGroup>
                    <img
                      src={showcaseImg}
                      style={{ height: 200, width: 200 }}
                      alt="edit"
                      name="currentImg"
                      id="currentImg"
                      className="link-black "
                    />
                  </FormGroup>
                </div>
              )
            ) : null}
            {/* product color */}
            <FormGroup>
              <h4>Ürün Rengi</h4>
              <div>
                {product.color ? (
                  <div
                    className="corner-radius smooth"
                    style={{
                      height: "50px",
                      width: "100%",
                      backgroundColor: product.color,
                    }}
                  ></div>
                ) : null}
                <div className="text-center">
                  <TwitterPicker
                    onChangeComplete={handleChangeComplete}
                  ></TwitterPicker>
                </div>
              </div>
            </FormGroup>
            {/* product description */}
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
            {/* product images */}
            <FormGroup>
              <Label for="showcasePhoto">Galeri</Label>
              <Input
                type="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                id="showcasePhoto"
                onChange={imageOnImageChange}
              />
              <FormText color="muted">
                Diğer fotoğrafları eklemek için burayı kullanalım
              </FormText>

              <ThumbnailContainer
                images={images}
                spinner={imageSpinner}
                deleteImage={deleteImage}
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
export function setImages(product) {
  const newImages = [];
  if (product._id !== undefined) {
    product.imageIds.forEach((imageId) => {
      newImages.push({
        _id: imageId,
        file: `/media/${imageId}?type=thumbnail`,
      });
    });
  }
  return newImages;
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
      : {
          categoryId: "",
          name: "",
          price: "",
          description: "",
          totalStock: 0,
          inStock: false,
          color: "",
          gender: "",
          showcaseImageId: "",
          imageIds: [],
          stockList: [],
        };
  const images =
    productId && state.productListReducer.length > 0 ? setImages(product) : [];
  // Eğer product var ise ekliyor fakat yoksa boş bir obje dönmek value'larda hataya sebebiyet veriyor, çözümü bulana kadar geçici kalsın.
  return {
    product,
    productImages: images,
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
  addProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
