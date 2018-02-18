import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchToDoList } from "../actions/toDoList";
import { getTasks } from '../selectors/task';
import ToDoList from '../components/ToDoList';

class ToDoListContainer extends Component {
    componentDidMount() {
        this.props.fetchToDoList();
    }
    

    render() {
        const { tasks } = this.props;
        return (
            <div>
                <ToDoList tasks={tasks} />
                
            </div>
        );
    }
}

ToDoListContainer.propTypes = {
    fetchToDoList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    tasks: getTasks(state)
})

const mapDispatchToProps = {
    fetchToDoList
}

export default connect(mapStateToProps,mapDispatchToProps)(ToDoListContainer);