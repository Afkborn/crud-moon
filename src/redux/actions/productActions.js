import * as actionTypes from "./actionTypes";
import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

export function getProductsSuccess(products) {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    payload: products,
  };
}

export function createProductSuccess(product) {
  console.log("createProductSuccess", product);
  return {
    type: actionTypes.CREATE_PRODUCT_SUCCESS,
    payload: product,
  };
}

export function updateProductSuccess(product) {
  return {
    type: actionTypes.UPDATE_PRODUCT_SUCCESS,
    payload: product,
  };
}

export function deleteProductSuccess(product) {
  return {
    type: actionTypes.DELETE_PRODUCT_SUCCESS,
    payload: product,
  };
}

export function getProductsApi(categoryId) {
  const configuration = {
    method: "get",
    url: "/products",
    params: {
      categoryId: categoryId,
    },
  };
  if (categoryId === null) {
    delete configuration.params;
  }
  return axios(configuration);
}

export function getProducts(categoryId) {
  return function (dispatch) {
    return getProductsApi(categoryId)
      .then((result) => {
        dispatch(getProductsSuccess(result.data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveProductApi(product) {
  console.log(`saveProductApi product`, product);
  const configuration = {
    method: "post",
    url: "/products",
    data: product,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (product._id) {
    configuration.method = "patch";
    configuration.url = `/products/${product._id}`;
  }
  console.log(`savedProductApi configuration`, configuration);
  return axios(configuration);
}

export function saveProduct(product) {
  return function (dispatch) {
    return saveProductApi(product)
      .then((savedProduct) => {
        product._id
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteProductApi(productId) {
  const configuration = {
    method: "delete",
    url: `/products/${productId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(configuration);
}

export function deleteProduct(product) {
  return function (dispatch) {
    return deleteProductApi(product._id)
      .then(() => {
        dispatch(deleteProductSuccess(product));
      })
      .catch((error) => {
        throw error;
      });
  };
}
