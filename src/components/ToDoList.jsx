import React from 'react';
import PropTypes from 'prop-types';
import ToDoListItem from './ToDoListItem';

const dummyO = {
	"index": 1,
	"title": "tarea1",
	"description": "Task description",
	"duration": 100,
	"elapsed": 1,
	"status": 1,
	"creationDate": "2018-02-16",
	"finishDate": "2018-02-16"
}

const ToDoList = ({tasks}) => {
    return (
        <div>
            <ToDoListItem {...dummyO}/>
        </div>
    );
};

ToDoList.propTypes = {
    tasks: PropTypes.array,
};

export default ToDoList;