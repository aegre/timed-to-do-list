// Components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'

// Components
import { renderLoading } from '../../helpers/renderLoading'
import ModalWindow from '../ModalWindow'
import { EDIT_MODE, NEW_MODE } from './constants'

// Styles
import './styles.css'
import { ROUTE_HOME } from 'constants/routes'
import Form from './Form'
import API from 'api'
import withTasksData from 'contexts/withTasksData'

class TaskForm extends Component {
  state = {
    isLoading: false,
    hasError: false
  }

  handleSubmit = (values) => {
    const { mode, taskId } = this.props

    this.setState({ isLoading: true })

    const newTask = {
      ...values,
      duration: values.duration * 60
    }

    try {
      if (mode === EDIT_MODE) {
        this.updateTask(newTask)
      } else {
        this.createTask(newTask)
      }
      this.setState({
        isLoading: false,
        hasError: false
      }, this.closeModal)
    } catch (error) {
      console.error(error)
      this.setState({
        hasError: true,
        isLoading: false
      })
    }
  }

  createTask = async (task) => {
    const { addTask } = this.props
    const { data: createdTask } = await API.Tasks.Create(task)
    addTask(createdTask)
  }

  updateTask = async (task) => {
    const response = await API.Tasks.Update('', task)
    console.log(response)
  }

  closeModal = () => {
    const { history } = this.props
    history.push(ROUTE_HOME)
  }

  render () {
    const {
      isLoading,
      hasError
    } = this.state

    const {
      mode
    } = this.props
    return (
      <ModalWindow show onClickOutside={this.closeModal}>
        <div className='to-do-form-container'>
          <div className='to-do-form'>
            <h2>{mode === EDIT_MODE ? 'Editar tarea' : 'Nueva tarea'}</h2>
            <Form closeModal={this.closeModal} onSubmit={this.handleSubmit} hasError={hasError} isLoading={isLoading} />
          </div>
        </div>
      </ModalWindow>
    )
  }
}

TaskForm.defaultProps = {
  mode: NEW_MODE,
  taskId: ''
}

TaskForm.propTypes = {
  mode: PropTypes.oneOf([NEW_MODE, EDIT_MODE]),
  taskId: PropTypes.string,
  addTask: PropTypes.func.isRequired
}

export default withRouter(withTasksData(TaskForm))
