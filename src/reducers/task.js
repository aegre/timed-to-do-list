import { handleActions } from "redux-actions";
import { SET_TO_DO_LIST, SET_TO_DO_INSERTING, SET_ERROR_ON_INSERTING } from "../constants";

export const task = handleActions( {
    [SET_TO_DO_LIST]: 
    (state, action) => ({ ...state, tasks: action.payload}),
    [SET_TO_DO_INSERTING]:
    (state, action) => ({ ...state, inserting: action.payload}),
    [SET_ERROR_ON_INSERTING]:
    (state, action) => ({ ...state, errorOnInserting: action.payload}),
}, { inserting: false, errorOnInserting: false })