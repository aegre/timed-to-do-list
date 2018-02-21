import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { fetchToDoList, insertTask, deleteTask, updateTask } from "../actions/toDoList";
import { getTasks, getToDoInserting, getErrorOnInserting, getSelectedTask } from '../selectors/task';
import ToDoList from '../components/ToDoList';
import ToDoForm from '../components/ToDoForm';

import "./styles.css"
import { ROUTE_TASK_NEW, ROUTE_HOME } from '../constants/routes';
import DeletePrompt from '../components/DeletePrompt';

class ToDoListContainer extends Component {

    componentDidMount = () => {
        this.props.fetchToDoList();
    }

    handleSubmit = values => {
        //convert minutes to seconds before save
        const task = { ...values };
        task.duration*= 60;

        const { taskId, selectedTask, insertTask, updateTask } = this.props;
        //Update task
        if( taskId !== undefined && selectedTask )
        {
            updateTask({ ...task }, taskId);
        }
        //Insert a new one
        else
        {
            insertTask({ ...task });
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.inserting && !nextProps.inserting && !this.props.errorOnInserting)
        {
            this.goHome();
        }
    }

    handleAddButton = () => {
        if(this.props.showEdit)
        {
            this.goHome();
        }
        else
        {
            this.props.history.push(ROUTE_TASK_NEW);
        }
    }

    goHome = () => {
        this.props.history.push(ROUTE_HOME);
    }

    handleOnDeleteConfirmation = () => {
        this.props.deleteTask(this.props.selectedTask);
        this.goHome();
    }

    getInitialValues = selectedTask => (
        {
            title: selectedTask.title,
            duration: selectedTask.duration/60,
            description: selectedTask.description
        }
    )
    
    render() {
        const { tasks, 
            showEdit, 
            showDelete, 
            selectedTask, 
            taskId,
            errorOnInserting,
            inserting
         } = this.props;
         const onEditionMode = taskId !== undefined;
         const showEditModal = (showEdit === true && !onEditionMode) ||
         ( onEditionMode && selectedTask && showEdit);
        return (
            <div>
                <div className="to-do-list-container-label">
                    <div className="section-header">
                        <h3>Tareas:</h3>
                    </div>
                    
                    <div className="to-do-list-container-actions tooltip">
                        <span className="tooltiptext">Nueva</span>
                        <div className="fas-button" onClick={this.handleAddButton}>
                        <i className="fas fa-plus"/>
                        </div>
                    </div>
                </div>
                <ToDoList
                    onSelect={this.handleOnSelect} 
                    onDelete={this.handleOnDelete} 
                    tasks={tasks}/>
                <DeletePrompt 
                    taskTitle={ selectedTask && selectedTask.title }
                    show={selectedTask != null && showDelete === true}
                    onCloseModal={this.goHome}
                    onDeleteConfirmation={this.handleOnDeleteConfirmation}
                    />
                {
                    showEditModal &&
                    <ToDoForm
                    editionMode={onEditionMode}
                    onCloseModal={this.goHome}
                    onSubmit={this.handleSubmit}
                    inserting={inserting}
                    errorOnInserting={errorOnInserting}
                    task={selectedTask}
                    initialValues={ selectedTask && this.getInitialValues(selectedTask)}
                    show={ showEditModal }
                    />    
                }
                
                
            </div>
        );
    }
}

ToDoListContainer.propTypes = {
    fetchToDoList: PropTypes.func.isRequired,
    showEdit: PropTypes.bool,
    showDelete: PropTypes.bool,
    inserting: PropTypes.bool.isRequired,
    errorOnInserting: PropTypes.bool.isRequired,
    taskId: PropTypes.string,
    insertTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    tasks: getTasks(state),
    inserting: getToDoInserting(state),
    errorOnInserting: getErrorOnInserting(state),
    selectedTask: getSelectedTask(state, props)
})
const mapDispatchToProps = {
    fetchToDoList,
    insertTask,
    deleteTask, 
    updateTask
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ToDoListContainer));