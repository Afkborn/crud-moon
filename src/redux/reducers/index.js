import { combineReducers } from "redux";
import userReducer from "./userReducer";
import spinnerReducer from "./spinnerReducer";

const rootReducer = combineReducers({
  // Add your reducers here
  userReducer,
  spinnerReducer,

});

export default rootReducer;
