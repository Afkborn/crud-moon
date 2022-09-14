import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(
  state = initialState.user,
  action
) {
  switch (action.type) {
    case actionTypes.GET_USER_DETAILS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
