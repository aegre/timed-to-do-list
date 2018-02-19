import { createAction } from "redux-actions";
import { SET_TO_DO_LIST, SET_TO_DO_INSERTING, SET_ERROR_ON_INSERTING } from "../constants";
import { apiGet, apiPost } from "../api";
import { URL_TASK } from "../api/urls";

export const setToDoList = createAction(SET_TO_DO_LIST);
export const setToDoInserting = createAction(SET_TO_DO_INSERTING);
export const setErrorOnInserting = createAction(SET_ERROR_ON_INSERTING);

export const fetchToDoList = () => (
    dispatch => (
         apiGet(URL_TASK,).then(
            data => {
                if(data.data)
                {
                    dispatch(setToDoList(data.data));
                }
            }            
        )
    )
)

export const insertTask = task => (
    dispatch => {
        dispatch(setToDoInserting(true));
        dispatch(setErrorOnInserting(false));
        return apiPost(URL_TASK, task).then(
            data => {
                if(data.status === 200)
                {
                    dispatch(setErrorOnInserting(false));
                    dispatch(fetchToDoList());
                }
                else {
                    dispatch(setErrorOnInserting(true));
                }
            }
        ).catch( () => dispatch(setErrorOnInserting(true)))
        .finally(
            () => {
                dispatch(setToDoInserting(false));
            }
        )
    }
)