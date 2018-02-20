import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from "redux-form";
import "./styles.css";

const formField = ({input, meta, type, label, name, placeholder
,min, max}) => (
    <div className="row">
        <div>
            <label htmlFor={name}>{label} :</label>
        </div>
        <div>
        {type === "textarea" ? <textarea {...input} placeholder={placeholder} /> :
        <input min={min} max={max} {...input} placeholder={placeholder} type={type ? type : "text"}/>
        }</div>
        <div>
        { meta.touched && meta.error && <span className="validation-error"> {meta.error} </span>}
        </div>
    </div>
);

const ToDoForm = ({
    onBack,
    handleSubmit,
    inserting,
    errorOnInserting
}) => {
    return (
        <div className="to-do-form-container">
            <div className="to-do-form card">
                <h2>Nueva tarea</h2>
                <form onSubmit={handleSubmit}>
                    <Field name="title" separationType="row" component={formField} type="text" label="Nombre*"></Field>
                    <Field name="description"  separationType="row" component={formField} type="textarea" label="Descripción"></Field>
                    <Field name="duration" min="0" max="120" component={formField} type="number" label="Duración (minutos max 120) *"></Field>
                    <Field name="duration" component="input" type="radio" value="15"/>15 mn
                    <Field name="duration" component="input" type="radio" value="30"/>30 mn
                    <Field name="duration" component="input" type="radio" value="60"/>60 mn
                    <div className="row">
                        <button onClick={onBack} type="button" disabled={inserting} >Cancelar</button>
                        <button className="button-action" type="submit" disabled={inserting} >Guardar</button>
                    </div>
                    { errorOnInserting &&
                    <div className=" validation-error row">
                        <span>Ocurrió un error, por favor intente de nuevo.</span>
                    </div>}

                    { inserting &&
                    <div className="row">
                        <span>Guardando...</span>
                    </div>
                    }
                </form>
            </div>
        </div>
    );
};

ToDoForm.propTypes = {
    onBack: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    inserting: PropTypes.bool.isRequired,
    errorOnInserting: PropTypes.bool.isRequired,
};

//validate fields
const validate = values => {
    const error = {};
    if(!values.title) {
        error.title = "Campo requerido";
    }
    if(!values.duration) {
        error.duration = "Campo requerido";
    }
    else if(values.duration < 1 || values.duration > 120){
        error.duration = "La duración debe tener un rango entre 1 y 120"
    }
    return error;
}


//redux form decoration
const connectedToDoForm = reduxForm(
    {
        form: "taskForm",
        validate
    })(ToDoForm)


export default connectedToDoForm;