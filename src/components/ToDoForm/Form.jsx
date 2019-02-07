// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import Loading from 'components/Loading'

// Components

const formField = (
  {
    input, meta, type, label, name, placeholder
    , min, max
  }) =>
  (
    <div className='row'>
      <div>
        <label htmlFor={name}>
          {`${label} :`}
        </label>
      </div>
      {
        type === 'textarea'
          ? <textarea {...input} placeholder={placeholder} />
          : <input min={min} max={max} {...input} placeholder={placeholder} type={type || 'text'} />
      }
      <div>
        {
          meta.touched && meta.error &&
            <span className='validation-error'>
              {meta.error}
            </span>
        }
      </div>
    </div>
  )

const Form = ({
  handleSubmit,
  isLoading,
  closeModal,
  hasError
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name='title' separationType='row' component={formField} type='text' label='Nombre*' />
      <Field name='description' separationType='row' component={formField} type='textarea' label='Descripción' />
      <Field name='duration' min='0' max='120' component={formField} type='number' label='Duración (minutos max 120) *' />
      <Field name='duration' component='input' type='radio' value='15' />
        15 mn
      <Field name='duration' component='input' type='radio' value='30' />
        30 mn
      <Field name='duration' component='input' type='radio' value='60' />
        60 mn
      <div className='row'>
        <button onClick={closeModal} type='button' disabled={isLoading} >Cancelar</button>
        <button className='button-action' type='submit' disabled={isLoading} >Guardar</button>
      </div>
      { hasError &&
      <div className=' validation-error row'>
        <span>Ocurrió un error, por favor intente de nuevo.</span>
      </div>}
      { isLoading &&
      <div className='row'>
        <Loading />
      </div>
      }
    </form>
  )
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired
}

// validate fields
const validate = values => {
  const error = {}
  if (!values.title) {
    error.title = 'Campo requerido'
  }
  if (!values.duration) {
    error.duration = 'Campo requerido'
  } else if (values.duration < 1 || values.duration > 120) {
    error.duration = 'La duración debe tener un rango entre 1 y 120'
  }
  return error
}

export default reduxForm(
  {
    form: 'taskForm',
    validate,
    enableReinitialize: true
  })(Form)
