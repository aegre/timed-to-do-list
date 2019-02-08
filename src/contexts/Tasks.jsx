// Libraries
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import API from 'api'
import { getPendingTasks, getOnProgressTask, getCompletedTasks } from 'selectors/task'

const TasksContext = React.createContext({})

const defaultState = {
  tasks: [],
  isLoading: true
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

  addTask = task => {
    this.setState(({
      tasks
    }) => ({
      tasks: [...tasks, task]
    }))
  }

  updateTask = task => {
    this.setState(({
      tasks
    }) => {
      const updatedTaskIndex = tasks.findIndex(({ _id }) => task._id === _id)

      const newTasks = [...tasks]
      newTasks[updatedTaskIndex] = task
      this.setState({
        tasks: newTasks
      })
    })
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
        isLoading,
        addTask: this.addTask,
        updateTask: this.updateTask
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
