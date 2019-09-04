import React from 'react'
import PropTypes from 'prop-types'
import ToDoListItem from './ToDoListItem'

const ToDoList = ({
  tasks,
  onComplete,
  onStopTimer,
  onPauseTimer,
  onStartTimer,
  startedTimer,
  onDrop,
  acceptDrop
}) => {
  if (tasks.length === 0) {
    return (
      <div
        className='text-center'
        onDragOver={evt => { acceptDrop && evt.preventDefault() }}
        onDrop={ev => { acceptDrop && onDrop(ev.dataTransfer.getData('taskId'), 0) }}
      >
        Sin tareas
      </div>
    )
  }
  return (
    tasks.map((task, index) =>
      (
        <ToDoListItem
          {...task}
          key={task._id}
          onStop={onStopTimer}
          onPause={onPauseTimer}
          onStart={onStartTimer}
          onComplete={onComplete}
          startedTimer={startedTimer}
          onDrop={onDrop}
        />))
  )
}

ToDoList.defaultProps = {
  tasks: []
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
