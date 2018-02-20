import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { fetchToDoList, insertTask } from "../actions/toDoList";
import { getTasks, getToDoInserting, getErrorOnInserting } from '../selectors/task';
import ToDoList from '../components/ToDoList';
import ToDoForm from '../components/ToDoForm';

import "./styles.css"
import { ROUTE_TASK_NEW, ROUTE_HOME } from '../constants/routes';

class ToDoListContainer extends Component {
    componentDidMount = () => {
        this.props.fetchToDoList();
    }

    renderEditForm = () => (
        <ToDoForm
            onBack={this.handleOnBack}
            onSubmit={this.handleSubmit}
            inserting={this.props.inserting}
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
    
    render() {
        const { tasks, showEdit } = this.props;
        return (
            <div>
                {showEdit && this.renderEditForm()}
                <div className="to-do-list-container-actions">
                    <div className="col section-header">
                        <h3>Tareas:</h3>
                    </div>
                    
                    <div className="col tooltip">
                        <span className="tooltiptext">Nueva</span>
                        <div id="save-button" onClick={this.handleAddButton}>
                        <i className="fas fa-plus"/>
                        </div>
                    </div>
                </div>
                <ToDoList tasks={tasks}/>
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
    errorOnInserting: getErrorOnInserting(state)
})

const mapDispatchToProps = {
    fetchToDoList,
    insertTask
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ToDoListContainer));