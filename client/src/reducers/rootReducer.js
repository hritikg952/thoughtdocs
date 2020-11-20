import { combineReducers } from "redux";

import userReducer from "./userReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
  user: userReducer,
  filter: filterReducer,
});

export default rootReducer;
