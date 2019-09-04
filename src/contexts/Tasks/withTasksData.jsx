import React from 'react'

import { TasksConsumer } from '.'

const withTasksData = (Component) => (props) => (
  <TasksConsumer>
    {(taskProps) => <Component {...taskProps} {...props} />}
  </TasksConsumer>
)

export default withTasksData
