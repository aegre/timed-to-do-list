// Libraries
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

// Components
import ModalWindow from '../ModalWindow'
import './styles.css'
import { ROUTE_TASK, ROUTE_HOME } from 'constants/routes'
import Loading from 'components/Loading'
import API from 'api'
import withTasksData from 'contexts/withTasksData'

class DeletePrompt extends Component {
  state = {
    isLoading: false,
    hasError: false
  }

  componentDidUpdate (_, prevState) {
    const { isLoading, hasError } = this.state

    if (prevState.isLoading && !isLoading && !hasError) {
      this.closeModal()
    }
  }

  closeModal = () => {
    const { history: { push } } = this.props
    push(ROUTE_TASK)
  }

  deleteTask = async () => {
    const { taskId, deleteTask } = this.props
    this.setState({ isLoading: true })
    try {
      await API.Tasks.Delete(taskId)
      this.setState({ isLoading: false, hasError: false })
      deleteTask(taskId)
    } catch (error) {
      this.setState({ isLoading: false, hasError: true })
      console.error(error)
    }
  }

  render () {
    const { taskTitle } = this.props

    const { isLoading, hasError } = this.state
    return (
      <ModalWindow show onClickOutside={this.closeModal}>
        <div>
          <span>{`¿Seguro que quieres eliminar "${taskTitle}"?`}</span>
          <div className='modal-buttons'>
            {
              isLoading
                ? <Loading />
                : (
                  <React.Fragment>
                    <Link to={ROUTE_HOME}>
                      <button >Cancelar</button>
                    </Link>
                    <button onClick={this.deleteTask} className='button-delete'>Eliminar</button>
                  </React.Fragment>
                )
            }
          </div>
          {
            hasError &&
            <p className='error-text'>
              Ocurrió un error al intentar borrar la tarea, por favor inténtalo de nuevo.
            </p>
          }
        </div>
      </ModalWindow>
    )
  }
}

DeletePrompt.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired,
  taskTitle: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(withTasksData(DeletePrompt))
