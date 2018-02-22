import React from 'react';
import PropTypes from 'prop-types';
import ToDoListItem from './ToDoListItem';

const renderTasks = (tasks,onComplete, onStopTimer, onPauseTimer, onStartTimer,startedTimer) => (
    tasks.map( task => (
        <ToDoListItem {...task} 
            onStop={onStopTimer} onPause={onPauseTimer} onStart={onStartTimer} 
            key={task._id} onComplete={onComplete} startedTimer={startedTimer} />
    ))
);

const ToDoList = ({tasks, 
    onComplete, 
    onStopTimer, 
    onPauseTimer, 
    onStartTimer,
    startedTimer}) => {
    return (
        <div>
            {tasks && renderTasks(tasks, onComplete, onStopTimer, 
                onPauseTimer, onStartTimer, startedTimer)}
            {tasks && tasks.length === 0 && <div className="text-center">Sin tareas</div> }
        </div>
    );
};

ToDoList.propTypes = {
    tasks: PropTypes.array,
    onComplete: PropTypes.func,
    onStopTimer: PropTypes.func,
    onPauseTimer: PropTypes.func,
    onStartTimer: PropTypes.func,
    startedTimer: PropTypes.bool,
};

export default ToDoList;