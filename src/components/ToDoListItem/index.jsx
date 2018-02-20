import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { formatDate } from '../../helpers/formatDate';
import { secondToMinutes } from '../../helpers/secondsToMinute';

const ToDoListItem = ({ title, description, duration,
    elapsed, creationDate
}) => {
    return (
        <div className="to-do-list-item card hoverable">
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
                <span className="to-do-list-item-property">Transcurrido:</span> <span>{secondToMinutes(elapsed)}      </span>
                <span className="to-do-list-item-property">Asignado:</span> <span>{secondToMinutes(duration)}</span>
            </div>
            <div className="to-do-list-item-creation">
                <span>{`Creada: ${formatDate(creationDate)}`}</span>
            </div>
        </div>
    );
};

ToDoListItem.propTypes = {
    title: PropTypes.string.isRequired,
};

export default ToDoListItem;