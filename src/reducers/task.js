import { handleActions } from "redux-actions";
import { SET_TO_DO_LIST, SET_TO_DO_INSERTING } from "../constants";

export const task = handleActions( {
    [SET_TO_DO_LIST]: 
    (state, action) => ({ ...state, tasks: action.payload}),
    [SET_TO_DO_INSERTING]:
    (state, action) => ({...state, inserting: action.payload})
}, { inserting: false })