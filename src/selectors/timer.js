import { createSelector } from 'reselect'

export const getInitializedTimer = createSelector(
  state => state.timer.initialized, initialized => initialized
)
