import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const ToDoListItem = ({ title, description, duration,
    elapsed, creationDate
}) => {
    return (
        <div className="to-do-list-item">
            <div className="to-do-list-item-title row">
                <span >
                    {title}
                </span>
            </div>
            <div className="to-do-list-item-description row">
                <span>
                    {description}
                </span>
            </div>  
            <div className="to-do-list-item-elapsed row">
                <span>{`Transcurrido: ${elapsed} `}</span>
                <span>{`Asignado: ${duration}`}</span>
            </div>
            <div className="to-do-list-item-creation">
                <span>{`Creada: ${creationDate}`}</span>
            </div>
        </div>
    );
};

ToDoListItem.propTypes = {
    title: PropTypes.string.isRequired,
};

export default ToDoListItem;