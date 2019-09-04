// Libraries
import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

// Components
import API from 'api'
import { getOnProgressTask, getCompletedTasks } from 'selectors/task'

export const TasksContext = React.createContext({})

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  /**
     * Fetch the tasks list and set it to the initial state
     */
  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await API.Tasks.Fetch()
      setTasks(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Just add a task at the end of the task list
   */
  const addTask = useCallback(task => {
    setTasks(prevTasks => [...prevTasks, task])
  }, [])

  /**
   * Get the index of the task with the id, the replace it in the task list
   */
  const updateTask = useCallback(task => {
    setTasks(prevTasks => {
      const updatedTaskIndex = prevTasks.findIndex(({ _id }) => task._id === _id)
      const newTasks = [...prevTasks]
      newTasks[updatedTaskIndex] = task
      return newTasks
    })
  }, [])

  /**
   * Filter the task by id to remove an element from the list
   */
  const deleteTask = useCallback(taskId => {
    setTasks(prevTasks => prevTasks.filter(({ _id }) => _id !== taskId))
  }, [])

  /**
   * Fetch the task list as soon the context is mounted
   */
  useEffect(() => { fetchTasks() }, [fetchTasks])

  const [onProgressTask, ...pendingTasks] = getOnProgressTask(tasks)

  return (
    <TasksContext.Provider value={{
      fetchTasks,
      tasks,
      pendingTasks,
      onProgressTask,
      completedTasks: getCompletedTasks(tasks),
      isLoading,
      addTask: addTask,
      updateTask: updateTask,
      deleteTask: deleteTask
    }}
    >
      {children}
    </TasksContext.Provider>
  )
}

TasksProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const TasksConsumer = TasksContext.Consumer

export { TasksConsumer, TasksProvider }
