import { createAction } from "redux-actions";
import { SET_TO_DO_LIST, SET_TO_DO_INSERTING, SET_ERROR_ON_INSERTING, SET_SELECTED_TASK } from "../constants";
import { apiGet, apiPost, apiDelete } from "../api";
import { URL_TASK } from "../api/urls";

export const setToDoList = createAction(SET_TO_DO_LIST);
export const setToDoInserting = createAction(SET_TO_DO_INSERTING);
export const setErrorOnInserting = createAction(SET_ERROR_ON_INSERTING);
export const setSelectedTask = createAction(SET_SELECTED_TASK);

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

export const deleteTask = task => (
    dispatch => {
        return apiDelete(`${URL_TASK}/${task._id}`).then(
            data => {
                //Reload collection
                dispatch(fetchToDoList());
            }
        )
    }
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