import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.css';
import { formatDate } from '../../helpers/formatDate';
import { secondToMinutes } from '../../helpers/secondsToMinute';
import { ROUTE_TASK_EDIT, ROUTE_TASK_DELETE } from '../../constants/routes';


const renderPause = (handler) => (
    <div className="fas-button" onClick={handler}>
        <i className="fas fa-pause"></i>
    </div>
)

const renderPlay = (handler) => (
    <div className="fas-button" onClick={handler}>
        <i className="fas fa-play"></i>
    </div>
)
const renderTimerIcons = (onStop, onPause, onStart, startedTimer) => (
    <div>
       
        <div className="fas-button" onClick={onStop}>
        <i className="fas fa-stop"></i>
        </div>
        { startedTimer && renderPause(onPause) }
        { !startedTimer && renderPlay(onStart) }

    </div>
)

const renderIcons = (status, id) => (
    <div>
        { status === 0 &&
            <Link to={ROUTE_TASK_EDIT.replace(":id", id)} className="fas-button">
                <i className="far fa-edit"></i>
            </Link>
        }
        <Link to={ROUTE_TASK_DELETE.replace(":id", id)} className="fas-button">
            <i className="fas fa-trash"></i>
        </Link>
    </div>
)

const ToDoListItem = ({ title, description, duration,
    elapsed, creationDate, _id, onComplete, status,
    finishDate, index, startedTimer,
    onStop, onPause, onStart
}) => {
    return (
        <div className="to-do-list-item card">
            <div className="to-do-list-item-container">
                <div className={`to-do-list-item-title row ${status && "completed"}`}>
                    <span>
                        {title} 
                    </span>
                </div>
                <div className={`to-do-list-item-description row ${status && "completed"}`}>
                    <span>
                        {description}
                    </span>
                </div>  
                <div className={`to-do-list-item-elapsed row ${status && "completed"}`} >
                    <span className="to-do-list-item-property">Transcurrido:</span> <span>{secondToMinutes(elapsed)}      </span>
                    <span className="to-do-list-item-property">Asignado:</span> <span>{secondToMinutes(duration)}</span>
                </div>
                { status === 0 &&
                    <div className="to-do-list-item-creation">
                        <p>{`${formatDate(creationDate)}`}</p>
                    </div>
                }
                { status === 1 &&
                 <div className="to-do-list-item-creation">
                 <span>{`Finalizada: ${formatDate(finishDate)}`}</span>
             </div>
                }
            </div>
            <div className="to-do-list-item-actions">
            {status === 0 && 
                <div className="to-do-list-item-complete">                
                    <span className="hide-on-low">Completar</span>
                    <div className="fas-button" onClick={() => onComplete(_id)}><i className="fas fa-check"></i></div>
                </div>
            }
                <div className="to-do-list-icons">
                    
                    { !(status === 0 && index === 0 && startedTimer)
                        && renderIcons(status, _id)}
                    {status === 0 && index === 0 && 
                        renderTimerIcons(onStop, onPause, onStart, startedTimer)}
                    
                </div>
            </div>
            
        </div>
    );
};


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
};

export default ToDoListItem;