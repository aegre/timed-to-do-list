import { handleActions } from 'redux-actions'
import { START_TIMER, STOP_TIMER } from '../constants'

export const timer = handleActions({
  [START_TIMER]:
    (state, action) => ({ ...state, initialized: action.payload }),
  [STOP_TIMER]:
    (state, action) => ({ ...state, initialized: action.payload })
}, { initialized: false })
