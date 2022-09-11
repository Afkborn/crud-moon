import * as actionTypes from "./actionTypes";
import axios from "axios";


export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
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
