import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { fetchToDoList, insertTask, deleteTask } from "../actions/toDoList";
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
        this.props.insertTask({ ...task });
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
    
    render() {
        const { tasks, showEdit, showDelete, selectedTask } = this.props;
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

                <ToDoForm
                    show={showEdit === true}
                    onCloseModal={this.goHome}
                    onSubmit={this.handleSubmit}
                    inserting={this.props.inserting}
                    errorOnInserting={this.props.errorOnInserting}
                />
                
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
    deleteTask
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ToDoListContainer));