import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { fetchToDoList } from "../actions/toDoList";
import { getTasks } from '../selectors/task';
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
        />
    );

    handleAddButton = () => {
        this.props.history.push(ROUTE_TASK_NEW);
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
                        <button id="save-button" onClick={this.handleAddButton}>
                        <i className="fas fa-plus"/>
                        </button>
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
};

const mapStateToProps = state => ({
    tasks: getTasks(state)
})

const mapDispatchToProps = {
    fetchToDoList
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ToDoListContainer));