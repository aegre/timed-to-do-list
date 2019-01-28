// Libraries
import React, { Component } from 'react'

// Components
import { TasksConsumer } from './Tasks'

export default function withTasksData (WrappedComponent) {
  return class extends Component {
    render () {
      return (
        <TasksConsumer>
          {(tasksProps) => (
            <WrappedComponent
              {...this.props}
              {...tasksProps}
            />
          )}
        </TasksConsumer>
      )
    }
  }
}
