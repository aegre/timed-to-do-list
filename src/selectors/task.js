import { createSelector } from 'reselect'
import { getTaskFilter } from '../helpers/taskFilter'

export const getTasks = createSelector(
  state => state.task.tasks, tasks => tasks
)

export const getPendingTasks = createSelector(
  (state, props) => getTasks(state).filter(task => getTaskFilter(props)(task))
  , tasks => tasks.filter(task => task.status === 0 && task.index > 0)
)

export const getOnProgressTask = createSelector(
  (state, props) => getTasks(state).filter(task => getTaskFilter(props)(task))
  , tasks => tasks.filter(task => task.status === 0 && task.index === 0)
)

export const getCompletedTasks = createSelector(
  state => getTasks(state), tasks => tasks.filter(task => task.status === 1)
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
