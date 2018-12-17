import React from 'react'
import loading from '../loading.svg'

export const renderLoading = size => (
  <img src={loading} alt='Cargando' className={`loading-image ${size}`} />
)
