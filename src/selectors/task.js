import { createSelector } from "reselect";

export const getTasks = createSelector(
    state => state.task.tasks, tasks => tasks
)

export const getToDoInserting = createSelector(
    state => state.task.inserting, inserting => inserting
)

export const getErrorOnInserting = createSelector(
    state => state.task.errorOnInserting, error => error
)

export const getSelectedTask = createSelector(
    (state,props) => state.task.tasks.find( t=> t._id === props.taskId) , task => task
)