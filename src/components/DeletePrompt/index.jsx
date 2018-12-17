import React from 'react'
import PropTypes from 'prop-types'
import ModalWindow from '../ModalWindow'
import './styles.css'

const DeletePrompt = ({ taskTitle, show, onCloseModal,
  onDeleteConfirmation }) => {
  return (
    <div>
      <ModalWindow show={show} onClickOutside={onCloseModal}>
        <div>
          <span>{`¿Seguro que quieres eliminar "${taskTitle}"?`}</span>
          <div className='modal-buttons'>
            <button onClick={onCloseModal}>Cancelar</button>
            <button onClick={onDeleteConfirmation} className='button-delete' >Eliminar</button>
          </div>
        </div>
      </ModalWindow>
    </div>
  )
}

DeletePrompt.propTypes = {
  taskTitle: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onDeleteConfirmation: PropTypes.func
}

export default DeletePrompt
