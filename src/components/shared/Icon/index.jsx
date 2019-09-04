import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ onClick, icon, isButton }) => {
  /**
   * TODO: Add the keyboard listener
   */
  const accesibleProps = onClick
    ? {
      role: 'button',
      onClick
    }
    : null

  const asButton = onClick || isButton

  return (
    <div className={asButton ? 'fas-button' : null} {...accesibleProps}>
      <i className={`fas fa-${icon}`} {...accesibleProps} />
    </div>
  )
}

Icon.defaultProps = {
  onClick: null,
  isButton: false
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isButton: PropTypes.bool
}

export default Icon
