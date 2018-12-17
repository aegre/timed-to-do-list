import React from 'react'
import PropTypes from 'prop-types'
import ToDoListItem from './ToDoListItem'

const renderTasks = (tasks, onComplete, onStopTimer, onPauseTimer, onStartTimer, startedTimer, onDrop) => (
  tasks.map((task, index) => (
    <ToDoListItem {...task}
      currentIndexOnList={index}
      onStop={onStopTimer} onPause={onPauseTimer} onStart={onStartTimer}
      key={task._id} onComplete={onComplete} startedTimer={startedTimer}
      onDrop={onDrop} />
  ))
)

const ToDoList = ({ tasks,
  onComplete,
  onStopTimer,
  onPauseTimer,
  onStartTimer,
  startedTimer,
  onDrop,
  acceptDrop }) => {
  return (
    <div>
      {tasks && renderTasks(tasks, onComplete, onStopTimer,
        onPauseTimer, onStartTimer, startedTimer, onDrop)}
      {tasks && tasks.length === 0 &&
      <div className='text-center'
        onDragOver={evt => { acceptDrop && evt.preventDefault() }}
        onDrop={ev => { acceptDrop && onDrop(ev.dataTransfer.getData('taskId'), 0) }}
      >
                    Sin tareas
      </div> }
    </div>
  )
}

ToDoList.propTypes = {
  tasks: PropTypes.array,
  onComplete: PropTypes.func,
  onStopTimer: PropTypes.func,
  onPauseTimer: PropTypes.func,
  onStartTimer: PropTypes.func,
  startedTimer: PropTypes.bool,
  onDrop: PropTypes.func,
  acceptDrop: PropTypes.bool
}

export default ToDoList
