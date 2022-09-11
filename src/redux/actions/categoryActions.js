import * as actionTypes from "./actionTypes";
import axios from "axios";

export function changeCategory(category) {
  return { type: actionTypes.CHANGE_CATEGORY, payload: category };
}

export function getCategoriesSuccess(categories) {
  return {
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    payload: categories,
  };
}

export function getCategories() {
  const configuration = {
    method: "get",
    url: "https://moon-backend.afkborn.keenetic.pro/categories",
  };
  return function (dispatch) {
    return axios(configuration)
      .then((result) => {
        dispatch(getCategoriesSuccess(result.data));
      })
      .catch((error) => {
        throw error;
      });
  };
}
