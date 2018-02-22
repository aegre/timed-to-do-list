import { combineReducers } from "redux";
import { task } from "./task";
import { reducer as form } from "redux-form";
import { timer } from "./timer";

export default combineReducers({
    task,
    timer,
    form
});