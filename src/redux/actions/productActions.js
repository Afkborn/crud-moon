import * as actionTypes from "./actionTypes";
import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
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
  return axios(configuration).then(handleResponse).catch(handleError);
}

export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  const error = await response.text();
  throw new Error(error);
}

export function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}

export function saveProduct(product) {
  return function (dispatch) {
    return saveProductApi(product)
      .then((savedProduct) => {
        dispatch(createProductSuccess(savedProduct));
      })
      .catch((error) => {
        throw error;
      });
  };
}
