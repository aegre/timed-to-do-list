import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchToDoList } from "../actions/toDoList";
import { getTasks } from '../selectors/task';
import ToDoList from '../components/ToDoList';

import "./styles.css"

class ToDoListContainer extends Component {
    componentDidMount() {
        this.props.fetchToDoList();
    }

    renderEditForm() {
        return (<h1>saludos</h1>)
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
                        <div className="fas fa-plus" id="save-button"/>
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

export default connect(mapStateToProps,mapDispatchToProps)(ToDoListContainer);