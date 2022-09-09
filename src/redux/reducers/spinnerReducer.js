import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function spinnerReducer(
  state = initialState.spinnerStatus,
  action
) {
  switch (action.type) {
    case actionTypes.SHOW_SPINNER:
      return true;
    case actionTypes.HIDE_SPINNER:
      return false;
    default:
      return state;
  }
}
