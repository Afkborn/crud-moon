import * as actionTypes from "./actionTypes";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

export function getUserDetailsSuccess(user) {
  return { type: actionTypes.GET_USER_DETAILS_SUCCESS, payload: user };
}

export function getUserDetailsAPI() {
    const configuration = {
        method: "get",
        url: "/users/me",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios(configuration);
}

export function getUserDetails(TOKEN) {
    return function (dispatch) {
        return getUserDetailsAPI()
            .then((result) => {
                dispatch(getUserDetailsSuccess(result.data));
            })
            .catch((error) => {
                throw error;
            });
    };
}