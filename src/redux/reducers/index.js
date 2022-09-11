import { combineReducers } from "redux";
import categoryListReducer from "./categoryListReducer";
import spinnerReducer from "./spinnerReducer";
import categoryReducer from "./categoryReducer";
const rootReducer = combineReducers({
  // Add your reducers here
  spinnerReducer,
  categoryListReducer,
  categoryReducer,
});

export default rootReducer;
