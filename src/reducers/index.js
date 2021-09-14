import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import loginReducer from "./loginReducer";
import onPageReducer from "./onPageReducer";

export default combineReducers({
  user: UserReducer,
  loginReducer: loginReducer,
  onPageReducer: onPageReducer,
});
