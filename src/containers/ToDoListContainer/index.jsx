// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { withLastLocation } from 'react-router-last-location'

// Components
import ToDoList from 'components/ToDoList'
import ToDoForm from 'components/ToDoForm'
import { ROUTE_TASK_NEW, ROUTE_HOME } from 'constants/routes'
import DeletePrompt from 'components/DeletePrompt'
import { getSelectedFilter } from 'selectors/general'
import FilterSelector from 'components/FilterSelector'
import { getInitializedTimer } from 'selectors/timer'
import { startTimer, stopTimer } from 'actions/timer'

// Actions
import { fetchToDoList, insertTask, deleteTask, updateTask, updateTaskDuration } from 'actions/toDoList'
import { getToDoInserting,
  getErrorOnInserting,
  getSelectedTask,
  getCompletedTasks,
  getOnProgressTask,
  getPendingTasks } from 'selectors/task'

// styles
import './styles.css'
import { EDIT_MODE, NEW_MODE } from 'components/ToDoForm/constants'

class ToDoListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = { timer: null }
  }

  componentDidMount () {
    this.changeSelectedTask()
  }

  componentDidUpdate (prevProps) {
    const { taskId } = this.props

    if (prevProps.taskId !== taskId) {
      this.changeSelectedTask()
    }
  }

  changeSelectedTask = () => {
    const { taskId, tasks } = this.props
    const selectedTask = tasks.find(({ _id }) => _id === taskId)
    this.setState({ selectedTask })
  }
  // handle update form

    // Handle drop for progress task
    handleDropInProgress = taskId => {
      this.stopTimerIfRunning()
      this.updateTaskIndex(taskId, 0)
    }

    stopTimerIfRunning = () => {
      this.props.initializedTimer && this.handlePauseTimer()
    }

    updateTaskIndex = (id, index) => {
      this.props.updateTask({ index }, id, true)
    }

    // handle drop for pending task
    handleDropInPending = (taskId, newIndex) => {
      const { selectedTask } = this.props
      // Is the on progress task stop the timer
      if (selectedTask && selectedTask[0]._id === taskId) {
        this.stopTimerIfRunning()
      }
      this.updateTaskIndex(taskId, newIndex + 1)
    }

    // timer tick
    handleTick = (cont) => {
      const { updateTaskDuration, onProgressTask } = this.props
      const task = onProgressTask[0]

      // create the action pay load
      const payload = { id: task._id,
        elapsed: task.elapsed + 1 }

      // Finish the task and reload list
      if (payload.elapsed >= task.duration) {
        this.handlePauseTimer()
        this.props.updateTask(
          { elapsed: payload.elapsed, status: 1 }, payload.id, true)
      }
      // Update the elapsed time and do not reload the list
      else {
        // Call the action
        updateTaskDuration(payload)

        // Update each 5 seconds without reloading
        if (cont % 5 === 0) {
          this.props.updateTask({ elapsed: payload.elapsed }, payload.id, false)
        }
      }
    }

    componentWillReceiveProps (nextProps) {
      const { errorOnInserting, inserting } = this.props
      if (inserting && !nextProps.inserting && !errorOnInserting) {
        this.goHome()
      }
    }

    // handle complete task click
    handleComplete = taskId => {
      // Send the update task method with status value = 1 (completed)
      this.props.updateTask({ status: 1 }, taskId, true)
    }

    goHome = () => {
      const { lastLocation } = this.props
      if (lastLocation && lastLocation.pathname) {
        this.props.history.push(`${ROUTE_HOME}${lastLocation.search}`)
      } else {
        this.props.history.push(ROUTE_HOME)
      }
    }

    componentWillUnmount = () => {
      if (this.props.initializedTimer) {
        this.handlePauseTimer()
      }
    }

    handleOnDeleteConfirmation = () => {
      this.props.deleteTask(this.props.selectedTask)
      this.goHome()
    }

    handlePauseTimer = () => {
      // Stop the timer in the state
      this.props.stopTimer()
      // stop timer in the component
      this.stopTimer()

      const { elapsed, _id } = this.props.onProgressTask[0]
      // Save changes
      this.props.updateTask({ elapsed }, _id, false)
    }

    startTimer = () => {
      var cont = 0
      const timer = setInterval(() => {
        cont++
        this.handleTick(cont)
      }, 1000)
      this.setState({ timer })
    }

    stopTimer = () => {
      // Remove timer
      clearInterval(this.state.timer)
    }

    handleStartTimer = () => {
      // start timer in the state
      this.props.startTimer()
      // start timer in the component
      this.startTimer()
    }

    handleStopTimer = () => {
      this.props.stopTimer()
      // stop timer in the component
      this.stopTimer()
      const { _id } = this.props.onProgressTask[0]
      // Save changes
      this.props.updateTaskDuration({ id: _id, elapsed: 0 })
      this.props.updateTask({ elapsed: 0 }, _id, false)
    }

    handleFiltterSelection = filter => {
      this.props.history.push(`${ROUTE_HOME}?filter=${filter}`)
    }

    render () {
      const { onProgressTask,
        pendingTasks,
        showModal,
        showDelete,
        taskId,
        errorOnInserting,
        inserting,
        completedTasks,
        selectedFilter,
        initializedTimer
      } = this.props
      const {
        selectedTask
      } = this.state

      const onEditionMode = !!taskId

      const showModalModal = (showModal && !onEditionMode) ||
         (onEditionMode && selectedTask && showModal)
      return (
            <>
              <div className='to-do-list-container-filter'>
                <FilterSelector
                  selectedFilter={selectedFilter}
                  onSelectedFilter={this.handleFiltterSelection}
                />
              </div>
              <div className='to-do-list-container-label'>
                <div className='section-header'>
                  <h3>En progreso:</h3>
                </div>

                <div className='to-do-list-container-actions tooltip'>
                  <span className='tooltiptext'>Nueva</span>
                  <Link className='fas-button' to={ROUTE_TASK_NEW}>
                    <i className='fas fa-plus' />
                  </Link >
                </div>
              </div>

              <ToDoList
                onDrop={this.handleDropInProgress}
                onStartTimer={this.handleStartTimer}
                onStopTimer={this.handleStopTimer}
                onPauseTimer={this.handlePauseTimer}
                onComplete={this.handleComplete}
                startedTimer={initializedTimer}
                tasks={onProgressTask ? [onProgressTask] : []}
                acceptDrop
              />
              <div className='to-do-list-container-label'>
                <div className='section-header'>
                  <h3>Pendientes:</h3>
                </div>
              </div>

              <ToDoList
                onDrop={this.handleDropInPending}
                onComplete={this.handleComplete}
                tasks={pendingTasks}
              />

              <div className='to-do-list-container-label'>
                <div className='section-header'>
                  <h3>Completadas:</h3>
                </div>
              </div>
              <ToDoList
                tasks={completedTasks}
              />

              <DeletePrompt
                taskTitle={selectedTask && selectedTask.title}
                show={selectedTask != null && showDelete === true}
                onCloseModal={this.goHome}
                onDeleteConfirmation={this.handleOnDeleteConfirmation}
              />
              {
                showModalModal &&
                <ToDoForm
                  mode={selectedTask ? EDIT_MODE : NEW_MODE}
                  editionMode={onEditionMode}
                  onCloseModal={this.goHome}
                  onSubmit={this.handleSubmit}
                  inserting={inserting}
                  errorOnInserting={errorOnInserting}
                  task={selectedTask}
                  show={showModalModal}
                  taskId={taskId}
                />
              }

            </>
      )
    }
}

ToDoListContainer.defaultProps = {
  onPropgressTasks: [],
  completedTasks: []
}

const TaskPropTypes = PropTypes.shape({
  status: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
}).isRequired

ToDoListContainer.propTypes = {
  fetchToDoList: PropTypes.func.isRequired,
  showModal: PropTypes.bool,
  showDelete: PropTypes.bool,
  inserting: PropTypes.bool.isRequired,
  errorOnInserting: PropTypes.bool.isRequired,
  taskId: PropTypes.string,
  insertTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  onProgressTask: TaskPropTypes,
  pendingTasks: PropTypes.array.isRequired,
  completedTasks: PropTypes.array.isRequired,
  lastLocation: PropTypes.object,
  initializedTimer: PropTypes.bool.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  updateTaskDuration: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  fetchToDoList,
  insertTask,
  deleteTask,
  updateTask,
  startTimer,
  stopTimer,
  updateTaskDuration
}

export default withLastLocation(withRouter(connect(null, mapDispatchToProps)(ToDoListContainer)))
