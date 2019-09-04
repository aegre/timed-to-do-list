import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './styles.css'
import { formatDate } from 'helpers/formatDate'
import { secondToMinutes } from 'helpers/secondsToMinute'
import { ROUTE_TASK_EDIT, ROUTE_TASK_DELETE } from 'constants/routes'
import Icon from 'components/shared/Icon'

const allowDrop = ev => {
  ev.preventDefault()
}

const sentDragData = task =>
  ev => {
    ev.dataTransfer.setData('taskId', task)
  }

const ToDoListItem = ({
  title, description, duration,
  elapsed, creationDate, _id, onComplete, status,
  finishDate, index, startedTimer,
  onStop, onPause, onStart,
  onDrop
}) => {
  return (
    <div
      className='to-do-list-item card'
      onDragStart={sentDragData(_id)}
      onDragOver={allowDrop}
      draggable={status === 0}
      onDrop={ev => { onDrop(ev.dataTransfer.getData('taskId'), index) }}
    >
      <div className='to-do-list-item-container'>
        <div className={`to-do-list-item-title row ${status && 'completed'}`}>
          <span>
            {title}
          </span>
        </div>
        <div className={`to-do-list-item-description row ${status && 'completed'}`}>
          <span>
            {description}
          </span>
        </div>
        <div className={`to-do-list-item-elapsed row ${status && 'completed'}`}>
          <span className='to-do-list-item-property'>Transcurrido:</span>
          {' '}
          <span>
            {secondToMinutes(elapsed)}
            {' '}
          </span>
          <span className='to-do-list-item-property'>Asignado:</span>
          {' '}
          <span>{secondToMinutes(duration)}</span>
        </div>
        {status === 0 &&
          <div className='to-do-list-item-creation'>
            <p>{`${formatDate(creationDate)}`}</p>
          </div>}
        {status === 1 &&
          <div className='to-do-list-item-creation'>
            <span>{`Finalizada: ${formatDate(finishDate)}`}</span>
          </div>}
      </div>
      <div className='to-do-list-item-actions'>
        {status === 0 && (index !== 0 || !startedTimer) &&
          <div className='to-do-list-item-complete'>
            <span className='hide-on-low'>Completar</span>
            <div className='fas-button' onClick={() => onComplete(_id)}><i className='fas fa-check' /></div>
          </div>}
        <div className='to-do-list-icons'>
          {
            status === 0 && !startedTimer && (
              <Link to={ROUTE_TASK_EDIT.replace(':id', _id)}>
                <Icon icon='edit' isButton />
              </Link>
            )
          }

          <Link to={ROUTE_TASK_DELETE.replace(':id', _id)}>
            <Icon icon='trash' isButton />
          </Link>
          {
            index === 0 && (
              <>
                <Icon icon='stop' onClick={onStop} />
                {startedTimer && <Icon icon='pause' onClick={onPause} />}
                {!startedTimer && <Icon icon='play' onClick={onStart} />}
              </>
            )
          }

        </div>
      </div>

    </div>
  )
}

ToDoListItem.propTypes = {
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  onComplete: PropTypes.func,
  index: PropTypes.number.isRequired,
  finishDate: PropTypes.string,
  startDate: PropTypes.string,
  startedTimer: PropTypes.bool,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onPause: PropTypes.func,
  currentIndexOnList: PropTypes.number.isRequired,
  onDrop: PropTypes.func
}

ToDoListItem.defaultProps = {
}

export default ToDoListItem
