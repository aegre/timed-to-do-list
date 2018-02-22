import { createAction } from "redux-actions";
import { SET_TO_DO_LIST, SET_TO_DO_INSERTING, SET_ERROR_ON_INSERTING, SET_SELECTED_TASK, UPDATE_TASK_DURATION } from "../constants";
import { apiGet, apiPost, apiDelete, apiPut } from "../api";
import { URL_TASK } from "../api/urls";

export const setToDoList = createAction(SET_TO_DO_LIST);
export const setToDoInserting = createAction(SET_TO_DO_INSERTING);
export const setErrorOnInserting = createAction(SET_ERROR_ON_INSERTING);
export const setSelectedTask = createAction(SET_SELECTED_TASK);
export const updateTaskDuration = createAction(UPDATE_TASK_DURATION);

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


export const updateTask = (task, taskid) => (
    dispatch => {
        dispatch(setToDoInserting(true));
        dispatch(setErrorOnInserting(false));
        return apiPut(`${URL_TASK}/${taskid}`,task).then(
            data => {
                if(data.status === 200)
                {
                    dispatch(setErrorOnInserting(false));
                    //reload the collection
                    dispatch(fetchToDoList());
                    dispatch(setToDoInserting(false));
                }
                else {
                    dispatch(setErrorOnInserting(true));
                    dispatch(setToDoInserting(false));
                }
            }
        ).catch( () => dispatch(setErrorOnInserting(true)))
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
                    //reload the collection
                    dispatch(fetchToDoList());
                    dispatch(setToDoInserting(false));
                }
                else {
                    dispatch(setErrorOnInserting(true));
                    dispatch(setToDoInserting(false));
                }
            }
        ).catch( () => dispatch(setErrorOnInserting(true)))
    }
)