import { createAction } from "redux-actions";
import { SET_TO_DO_LIST, SET_TO_DO_INSERTING } from "../constants";
import { apiGet, apiPost } from "../api";
import { URL_TASK } from "../api/urls";

export const setToDoList = createAction(SET_TO_DO_LIST);
export const setToDoInserting = createAction(SET_TO_DO_INSERTING);

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
        return apiPost(URL_TASK, task).then(
            data => {
                dispatch(fetchToDoList());
            }
        ).finally(
            () => {
                dispatch(setToDoInserting(false));
            }
        )
    }
)