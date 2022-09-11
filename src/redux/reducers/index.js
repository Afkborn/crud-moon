import { combineReducers } from "redux";
import categoryListReducer from "./categoryListReducer";
import spinnerReducer from "./spinnerReducer";
import categoryReducer from "./categoryReducer";
import productListReducer from "./productListReducer";
const rootReducer = combineReducers({
  // Add your reducers here
  spinnerReducer,
  categoryListReducer,
  categoryReducer,
  productListReducer,
});

export default rootReducer;
