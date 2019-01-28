// Libraries
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import API from 'api'
import { getPendingTasks, getOnProgressTask, getCompletedTasks } from 'selectors/task'

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
        tasks: [],
        isLoading: false
      })
    }
  }

  render () {
    const { children } = this.props
    const { tasks, isLoading } = this.state

    const [onProgressTask, ...pendingTasks] = getOnProgressTask(tasks)

    return (
      <TasksContext.Provider value={{
        fetchTasks: this.fetchTasks,
        tasks,
        pendingTasks,
        onProgressTask,
        completedTasks: getCompletedTasks(tasks),
        isLoading
      }}
      >
        {children}
      </TasksContext.Provider>
    )
  }
}

TasksProvider.propTypes = {
  children: PropTypes.number.isRequired
}

const TasksConsumer = TasksContext.Consumer

export { TasksConsumer, TasksProvider }
