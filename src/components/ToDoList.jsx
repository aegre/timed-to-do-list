import React from 'react';
import PropTypes from 'prop-types';
import ToDoListItem from './ToDoListItem';

const renderTasks = (tasks,onComplete) => (
    tasks.map( task => (
        <ToDoListItem {...task} key={task._id} onComplete={onComplete} />
    ))
);

const ToDoList = ({tasks, onComplete}) => {
    return (
        <div>
            {tasks && renderTasks(tasks, onComplete)}
        </div>
    );
};

ToDoList.propTypes = {
    tasks: PropTypes.array,
    onComplete: PropTypes.func,
};

export default ToDoList;