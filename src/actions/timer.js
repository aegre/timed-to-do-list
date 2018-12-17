import { createAction } from 'redux-actions'
import { START_TIMER, STOP_TIMER } from '../constants'

export const startTimer = createAction(START_TIMER, () => true)
export const stopTimer = createAction(STOP_TIMER, () => false)
