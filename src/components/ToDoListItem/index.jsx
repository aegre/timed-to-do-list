import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const ToDoListItem = ({ title, description, duration,
    elapsed, creationDate
}) => {
    return (
        <div className="to-do-list-item">
            <div className="to-do-list-item-title">
                <span >
                    {title}
                </span>
            </div>
            <div >
                <span className="to-do-list-item-description">
                    {description}
                </span>
            </div>  
            <div className="to-do-list-item-elapsed">
                <span>{`Transcurrido: ${elapsed} `}</span>
                <span>{`Asignado: ${duration}`}</span>
            </div>
            <div>
                <span>{`Creada: ${creationDate}`}</span>
            </div>
        </div>
    );
};

ToDoListItem.propTypes = {
    title: PropTypes.string.isRequired,
};

export default ToDoListItem;