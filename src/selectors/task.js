import { createSelector } from 'reselect'

export const getOnProgressTask = createSelector(
  tasks => tasks,
  tasks => tasks.filter(({ status }) => status === 0)
)

export const getCompletedTasks = createSelector(
  tasks => tasks,
  tasks => tasks.filter(({ status }) => status === 1)
)

export const getToDoInserting = createSelector(
  state => state.task.inserting, inserting => inserting
)

export const getErrorOnInserting = createSelector(
  state => state.task.errorOnInserting, error => error
)

export const getSelectedTask = createSelector(
  (state, props) => state.task.tasks.find(t => t._id === props.taskId), task => task
)
