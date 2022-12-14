import React, { useEffect } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { Badge } from "reactstrap";
import { getCategories } from "../../redux/actions/categoryActions";
import { changeCategory } from "../../redux/actions/categoryActions";
import { connect } from "react-redux";
import { showSpinner, hideSpinner } from "../../redux/actions/spinnerActions";
import { getProducts } from "../../redux/actions/productActions";
import { Link } from "react-router-dom";

function CategoryList({
  categories,
  getCategories,
  changeCategory,
  currentCategory,
  history,
  getProducts,
  showSpinner,
  hideSpinner,
  ...props
}) {
  useEffect(() => {
    getCategories();
    getProducts();
  }, [getCategories, getProducts]);

  function selectCategory(category) {
    showSpinner();
    changeCategory(category);
    getProducts(category._id);
  }

  return (
    <div>
      <h2 className="text-center">
        <Badge color="info" onClick={() => selectCategory("")}>
          Kategori
        </Badge>{" "}
        <Badge color="secondary">{categories.length}</Badge>
      </h2>

      <ListGroup>
        <ListGroupItem
          active={currentCategory === ""}
          onClick={() => selectCategory("")}
          key={0}
        >
          <span>Tüm Ürünler</span>
        </ListGroupItem>

        {categories.map((category) => (
          <ListGroupItem
            active={category._id === currentCategory._id}
            onClick={() => selectCategory(category)}
            key={category._id}
          >
            <span>{category.name}</span>
            <Link to={"/category/" + category._id}>
              <img
                src="edit.svg"
                style={{ height: 25, width: 25 }} // loc end item
                alt="edit"
                className="link-black to-right "
              />
            </Link>
          </ListGroupItem>
        ))}
      </ListGroup>
      <Link to="/category">
        <Button color="success" className="secondary mt-3 text-center">
          Kategori ekle
        </Button>
      </Link>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentCategory: state.categoryReducer,
    categories: state.categoryListReducer,
  };
}
const mapDispatchToProps = {
  getCategories,
  changeCategory,
  getProducts,
  showSpinner,
  hideSpinner,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
