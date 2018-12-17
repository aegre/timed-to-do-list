import { handleActions } from 'redux-actions'
import { SET_TO_DO_LIST, SET_TO_DO_INSERTING, SET_ERROR_ON_INSERTING, SET_SELECTED_TASK, UPDATE_TASK_DURATION } from '../constants'

export const task = handleActions({
  [SET_TO_DO_LIST]:
    (state, action) => ({ ...state, tasks: action.payload }),
  [SET_TO_DO_INSERTING]:
    (state, action) => ({ ...state, inserting: action.payload }),
  [SET_ERROR_ON_INSERTING]:
    (state, action) => ({ ...state, errorOnInserting: action.payload }),
  [SET_SELECTED_TASK]:
    (state, action) => ({ ...state, selectedTask: action.payload }),
  [UPDATE_TASK_DURATION]:
    (state, action) => ({ ...state,
      tasks: state.tasks.map(task => (task._id ===
        action.payload.id ? { ...task, elapsed: action.payload.elapsed } : task
      )) })
}, { inserting: false, errorOnInserting: false, tasks: [], selectedTask: '' })
