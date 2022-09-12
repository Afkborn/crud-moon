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

export function getProducts(categoryId) {
  const configuration = {
    method: "get",
    url: "https://moon-backend.afkborn.keenetic.pro/products",
    params: {
      categoryId: categoryId,
    },
  };
  if (categoryId == null) {
    delete configuration.params;
  }
  return function (dispatch) {
    return axios(configuration)
      .then((result) => {
        dispatch(getProductsSuccess(result.data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveProductApi(product) {
  const configuration = {
    method: "post",
    url: "https://moon-backend.afkborn.keenetic.pro/products",
    data: product,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (product.id) {
    configuration.method = "put";
    configuration.url = `https://moon-backend.afkborn.keenetic.pro/products/${product.id}`;
  }
  return axios(configuration);
}

export function saveProduct(product) {
  return function (dispatch) {
    return saveProductApi(product)
      .then((savedProduct) => {
        product.id
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
    url: `https://moon-backend.afkborn.keenetic.pro/products/${productId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(configuration);
}

export function deleteProduct(product) {
  return function (dispatch) {
    return deleteProductApi(product.id)
      .then(() => {
        dispatch(deleteProductSuccess(product));
      })
      .catch((error) => {
        throw error;
      });
  };
}
