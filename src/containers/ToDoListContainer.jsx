import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { fetchToDoList, insertTask, setSelectedTask } from "../actions/toDoList";
import { getTasks, getToDoInserting, getErrorOnInserting, getSelectedTask } from '../selectors/task';
import ToDoList from '../components/ToDoList';
import ToDoForm from '../components/ToDoForm';

import "./styles.css"
import { ROUTE_TASK_NEW, ROUTE_HOME } from '../constants/routes';
import DeletePrompt from '../components/DeletePrompt';

class ToDoListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { showModal: false }
    }
    componentDidMount = () => {
        this.props.fetchToDoList();
    }

    renderEditForm = () => (
        <ToDoForm
            onBack={this.handleOnBack}
            onSubmit={this.handleSubmit}
            inserting={this.props.inserting}
            errorOnInserting={this.props.errorOnInserting}
        />
    );

    handleOnSubmitSuccess = () => {
        this.props.history.push(ROUTE_HOME);
    }

    handleSubmit = values => {
        //convert minutes to seconds before save
        values.duration*= 60;
        this.props.insertTask(values);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.inserting && !nextProps.inserting && !this.props.errorOnInserting)
        {
            this.props.history.push(ROUTE_HOME);
        }
    }

    handleAddButton = () => {
        if(this.props.showEdit)
        {
            this.props.history.push(ROUTE_HOME);
        }
        else
        {
            this.props.history.push(ROUTE_TASK_NEW);
        }
        
    }

    handleOnBack = () => {
        this.props.history.push(ROUTE_HOME);
    }

    handleOnDelete = () => {
        this.setState({ showModal: true });
    }

    handleCloseOnDelete = () => {
        this.setState({ showModal: false });
    }

    handleOnSelect = id => {
        this.props.setSelectedTask(id);
    }
    
    render() {
        const { tasks, showEdit, selectedTask } = this.props;
        const { showModal } = this.state;
        return (
            <div>
                {showEdit && this.renderEditForm()}
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
                    show={showModal}
                    onCloseModal={this.handleCloseOnDelete}
                    />
            </div>
        );
    }
}

ToDoListContainer.propTypes = {
    fetchToDoList: PropTypes.func.isRequired,
    showEdit: PropTypes.bool,
    inserting: PropTypes.bool.isRequired,
    errorOnInserting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    tasks: getTasks(state),
    inserting: getToDoInserting(state),
    errorOnInserting: getErrorOnInserting(state),
    selectedTask: getSelectedTask(state)
})
const mapDispatchToProps = {
    fetchToDoList,
    insertTask,
    setSelectedTask
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ToDoListContainer));