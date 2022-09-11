import React, { useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Badge } from "reactstrap";
import { getCategories } from "../../redux/actions/categoryActions";
import { changeCategory } from "../../redux/actions/categoryActions";
import { connect } from "react-redux";

function CategoryList({ categories, getCategories, changeCategory, currentCategory, history, ...props }) {
  useEffect(() => {
    getCategories();
  }, []);

  function selectCategory (category) {
    changeCategory(category);
  };

  return (
    <div>
      <h2>
        <Badge color="info">Categories</Badge>{" "}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
