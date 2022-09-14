import { combineReducers } from "redux";
import categoryListReducer from "./categoryListReducer";
import spinnerReducer from "./spinnerReducer";
import categoryReducer from "./categoryReducer";
import productListReducer from "./productListReducer";
import userReducer from "./userReducer";
const rootReducer = combineReducers({
  // Add your reducers here
  spinnerReducer,
  categoryListReducer,
  categoryReducer,
  productListReducer,
  userReducer,
});

export default rootReducer;
