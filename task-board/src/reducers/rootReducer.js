import { combineReducers } from "redux";

import user from "./loginReducer";
import todo from "./todoReducer";
import category from "./categoryReducer";
import notification from "./notificationReducer";

const rootReducer = combineReducers({
  user,
  todo,
  category,
  notification
});

export default rootReducer;
