import * as actionTypes from "./actionTypes";
import * as spinnerActions from "./spinnerActions";

var md5 = require('md5');
const { SALT } = require("../../salt/Salt"); //get salt from salt.js

export function getUserSuccess(user) {
  return { type: actionTypes.GET_USER_SUCCESS, payload: user };
}


export function getUser(username, password) {
    const hashedPassword = md5((password + SALT).toString());
    let endpoint = `/users/${username}?password=${hashedPassword}`;
    return function (dispatch) {
        return fetch(endpoint)
        .then((response) => response.json())
        .then((result) => dispatch(getUserSuccess(result)))
        .then(() => dispatch(spinnerActions.hideSpinner()))
    };
    }
