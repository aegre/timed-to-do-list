import React from 'react';
import PropTypes from 'prop-types';
import ToDoListItem from './ToDoListItem';

const renderTasks = (tasks, onDelete, onSelect) => (
    tasks.map( task => (
        <ToDoListItem {...task} key={task._id} 
        onDelete={onDelete}
        onSelect={onSelect} />
    ))
);

const ToDoList = ({tasks, onDelete, onSelect }) => {
    return (
        <div>
            {tasks && renderTasks(tasks, onDelete, onSelect)}
        </div>
    );
};

ToDoList.propTypes = {
    tasks: PropTypes.array,
    onDelete: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
};

export default ToDoList;