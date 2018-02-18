import { combineReducers } from "redux";
import { task } from "./task";
import { reducer as form } from "redux-form";

export default combineReducers({
    task,
    form
});