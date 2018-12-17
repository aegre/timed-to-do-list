import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const ModalWindow = ({ children, show, onClickOutside }) => {
  const style = {
    display: show ? 'block' : 'none'
  }
  return (

    <div id='modal-window' className='modal'
      style={style}
      onClick={() => { onClickOutside && onClickOutside() }}
    >
      <div className='modal-content'
        onClick={e => { e.stopPropagation() }}>
        {children}
      </div>
    </div>
  )
}

ModalWindow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClickOutside: PropTypes.func,
  show: PropTypes.bool
}

export default ModalWindow
