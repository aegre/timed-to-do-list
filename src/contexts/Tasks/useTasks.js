import { useContext } from 'react'

import { TaskContext } from './'

/**
 * Hook to get all the task context props
 * use only in function component
 */
const useTasks = () => useContext(TaskContext)

export default useTasks
