import { createSelector } from "reselect";

export const getTasks = createSelector(
    state => state.task.tasks, tasks => tasks
)