import React from "react";
import { Badge, Table } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function ProductList({ currentCategory, products, history, ...props }) {

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
        {/* <td>
          <img
            src="edit.svg"
            style={{ height: 25, width: 25 }}
            alt="edit"
            onClick={() => editProduct(product)}
            className="link-black"
          />
        </td> */}
      </tr>
    );
  }

  return (
    <div>
      <h2>
        <Badge color="success">Ürünler</Badge>{" "}
        <Badge color="danger">{currentCategory.name}</Badge> {" "}
        <Badge color="info">{products.length}</Badge> {" "}
      </h2>

      <div>
        <Table>
          <thead>
            <tr>
              <th>Ürün Adı</th>
              <th>Fiyat</th>
              <th>Stok</th>
              <th>Açıklama</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>{products.map((product) => renderProduct(product))}</tbody>
        </Table>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentCategory: state.categoryReducer,
    products: state.productListReducer,
  };
}
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
