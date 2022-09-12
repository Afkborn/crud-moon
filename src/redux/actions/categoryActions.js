import * as actionTypes from "./actionTypes";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

export function changeCategory(category) {
  return { type: actionTypes.CHANGE_CATEGORY, payload: category };
}

export function getCategoriesSuccess(categories) {
  return {
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    payload: categories,
  };
}

export function createCategorySuccess(category) {
  return {
    type: actionTypes.CREATE_CATEGORY_SUCCESS,
    payload: category,
  };
}

export function updateCategorySuccess(category) {
  return {
    type: actionTypes.UPDATE_CATEGORY_SUCCESS,
    payload: category,
  };
}

export function deleteCategorySuccess(category) {
  return {
    type: actionTypes.DELETE_CATEGORY_SUCCESS,
    payload: category,
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

export function saveCategoryAPI(category) {
  const configuration = {
    method: "post",
    url: "https://moon-backend.afkborn.keenetic.pro/categories",
    data: category,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (category._id) {
    configuration.method = "put";
    configuration.url = `https://moon-backend.afkborn.keenetic.pro/categories/${category._id}`;
  }
  return axios(configuration);
}

export function saveCategory(category) {
  return function (dispatch) {
    return saveCategoryAPI(category)
      .then((savedCategory) => {
        category._id
          ? dispatch(updateCategorySuccess(savedCategory))
          : dispatch(createCategorySuccess(savedCategory));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteCategoryAPI(category) {
  const configuration = {
    method: "delete",
    url: `https://moon-backend.afkborn.keenetic.pro/categories/${category._id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(configuration);
}

export function deleteCategory(category) {
  return function (dispatch) {
    return deleteCategoryAPI(category)
      .then((deletedCategory) => {
        dispatch(deleteCategorySuccess(deletedCategory));
      })
      .catch((error) => {
        throw error;
      });
  };
}
