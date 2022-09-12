import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function categoryListReducer(
  state = initialState.categories,
  action
) {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return action.payload;
    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return [...state, { ...action.payload }];
    case actionTypes.UPDATE_CATEGORY_SUCCESS:
      return state.map((category) =>
        category._id === action.payload._id ? action.payload : category
      );
    case actionTypes.DELETE_CATEGORY_SUCCESS:
      return state.filter((category) => category._id !== action.payload._id);

    default:
      return state;
  }
}
