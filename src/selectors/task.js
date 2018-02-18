import { createSelector } from "reselect";

export const getTasks = createSelector(
    state => state.task.tasks, tasks => tasks
)

export const getToDoInserting = createSelector(
    state => state.task.inserting, inserting => inserting
)