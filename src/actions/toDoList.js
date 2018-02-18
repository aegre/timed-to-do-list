import { createAction } from "redux-actions";
import { SET_TO_DO_LIST } from "../constants";
import { apiGet } from "../api";
import { URL_TASK } from "../api/urls";

export const setToDoList = createAction(SET_TO_DO_LIST);

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