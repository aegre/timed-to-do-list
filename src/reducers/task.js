import { handleActions } from "redux-actions";
import { SET_TO_DO_LIST } from "../constants";

export const task = handleActions( {
    [SET_TO_DO_LIST]: 
    (state, action) => ({ ...state, tasks: action.payload}),
}, {})