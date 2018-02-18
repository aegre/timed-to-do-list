import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchToDoList } from "../actions/toDoList";

class ToDoListContainer extends Component {
    componentDidMount() {
        this.props.fetchToDoList();
    }
    

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

ToDoListContainer.propTypes = {
    fetchToDoList: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    fetchToDoList
}

export default connect(null,mapDispatchToProps)(ToDoListContainer);