import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from "redux-form";
import "./styles.css";

const formField = ({input, meta, type, label, name, placeholder}) => (
    <div className="row">
        <div>
            <label htmlFor={name}>{label} :</label>
        </div>
        <div>
        {type === "textarea" ? <textarea {...input} placeholder={placeholder} /> :
        <input {...input} placeholder={placeholder} type={type ? type : "text"}/>
        }</div>
        <div>
        { meta.touched && meta.error && <span className="validation-error"> {meta.error} </span>}
        </div>
    </div>
);

const ToDoForm = props => {
    return (
        <div className="to-do-form-container">
            <div className="to-do-form card">
                <h2>Nueva tarea</h2>
                <form>
                    <Field name="name" separationType="row" component={formField} type="text" label="Nombre*"></Field>
                    <Field name="description"  separationType="row" component={formField} type="textarea" label="Descripción"></Field>
                    <Field name="duration" placeholder="hh:mm:ss" component={formField} type="text" label="Duración*"></Field>
                    <div className="row">
                        <button>Cancelar</button>
                        <button type="submit" >Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

ToDoForm.propTypes = {
    dummy: PropTypes.string,
};

const validate = values => {
    const error = {};
    if(!values.name) {
        error.name = "Campo requerido";
    }
    if(!values.duration) {
        error.duration = "Campo requerido";
    }

    return error;
}

const connectedToDoForm = reduxForm(
    {
        form: "taskForm",
        validate
    })(ToDoForm)

export default connectedToDoForm;