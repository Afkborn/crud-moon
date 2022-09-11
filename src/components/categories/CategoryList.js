import React, { useEffect } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { Badge } from "reactstrap";
import { getCategories } from "../../redux/actions/categoryActions";
import { changeCategory } from "../../redux/actions/categoryActions";
import { connect } from "react-redux";

import { getProducts } from "../../redux/actions/productActions";

function CategoryList({
  categories,
  getCategories,
  changeCategory,
  currentCategory,
  history,
  getProducts,
  ...props
}) {
  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  function selectCategory(category) {
    changeCategory(category);
    getProducts(category._id);
  }

  return (
    <div>
      <h2 className="text-center">
        <Badge color="info">Kategori</Badge>{" "}
        <Badge color="secondary">{categories.length}</Badge>
      </h2>

      <ListGroup>
        {categories.map((category) => (
          <ListGroupItem
            active={category._id === currentCategory._id}
            onClick={() => selectCategory(category)}
            key={category._id}
          >
            {category.name}
          </ListGroupItem>
        ))}
      </ListGroup>
      <h2>
        <Button color="success">Kategori Ekle</Button>
      </h2>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
