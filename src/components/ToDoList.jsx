import React from 'react';
import PropTypes from 'prop-types';
import ToDoListItem from './ToDoListItem';

const renderTasks = (tasks) => (
    tasks.map( task => (
        <ToDoListItem {...task} key={task._id} />
    ))
);

const ToDoList = ({tasks}) => {
    return (
        <div>
            {tasks && renderTasks(tasks)}
        </div>
    );
};

ToDoList.propTypes = {
    tasks: PropTypes.array
};

export default ToDoList;