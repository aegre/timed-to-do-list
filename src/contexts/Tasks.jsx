// Libraries
import React, { Component } from 'react'
import API from 'api'

// Components

const TasksContext = React.createContext({})

const defaultState = {
  tasks: [],
  isLoading: false
}

class TasksProvider extends Component {
  state= {
    ...defaultState
  }

  componentDidMount () {
    this.fetchTasks()
  }

  fetchTasks = async () => {
    try {
      this.setState({ isLoading: true })
      const {
        data: tasks
      } = await API.Tasks.Fetch()
      this.setState({ isLoading: false, tasks })
    } catch (error) {
      console.error(error)
      this.setState({
        tasks: undefined,
        isLoading: false
      })
    }
  }

  render () {
    const { children } = this.props
    const { tasks, isLoading } = this.state
    return (
      <TasksContext.Provider value={{
        fetchTasks: this.fetchTasks,
        tasks,
        isLoading
      }}
      >
        {children}
      </TasksContext.Provider>
    )
  }
}
const TasksConsumer = TasksContext.Consumer

export { TasksConsumer, TasksProvider }
