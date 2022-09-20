import React from "react";
import { Badge, Button, Container, Table, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function ProductList({
  currentCategory,
  products,
  spinner,
  history,
  ...props
}) {
  function renderProduct(product) {
    return (
      <tr key={product._id}>
        <td>
          {" "}
          <Link to={"/product/" + product._id} className="link-black">
            {" "}
            {product.name}{" "}
          </Link>{" "}
        </td>
        <td>{product.price}</td>
        <td>{product.stock}</td>
        <td>{product.description}</td>
      </tr>
    );
  }
  function renderProducts() {
    return products.map((product) => renderProduct(product));
  }
  function renderEmpty() {
    return (
      <tr>
        <td colSpan="4" className="text-center">
          <h2>Ürün Bulunamadı</h2>
          
        </td>
      </tr>
    );
  }

  return (
    <div>
      <h2>
        <Badge color="success">Ürünler</Badge>{" "}
        <Badge color="danger">{currentCategory.name}</Badge>{" "}
        <Badge color="info">{products.length}</Badge>{" "}
      </h2>

      <Container fluid>
        <Link to="/product">
          <Button color="secondary" className="text-center">
            <img
              src="add.svg"
              style={{ height: 16, width: 16 }} // loc end item
              alt="edit"
              className="link-black "
            />{" "}
            Ürün Ekle
          </Button>
        </Link>
      </Container>

      <div>
        {spinner && (
          <div className="text-center">
            <Spinner type="grow" color="danger" />
          </div>
        )}
        {!spinner && (
          <Table>
            <thead>
              <tr>
                <th>Ürün Adı</th>
                <th>Fiyat</th>
                <th>Stok</th>
                <th>Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? renderProducts() : renderEmpty()}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentCategory: state.categoryReducer,
    products: state.productListReducer,
    spinner: state.spinnerReducer,
  };
}
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
