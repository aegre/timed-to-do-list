// Libraries
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import ToDoListContainer from 'containers/ToDoListContainer'
import { ROUTE_HOME, ROUTE_TASK, ROUTE_TASK_NEW, ROUTE_TASK_EDIT, ROUTE_TASK_DELETE, ROUTE_STADISTICS } from 'constants/routes'
import ChartsContainer from 'containers/ChartsContainer'
import withTasksData from 'contexts/Tasks/withTasksData'

class Routes extends Component {
  render () {
    return (
      <>
        <Route
          exact
          path={ROUTE_HOME}
          render={props => <ToDoListContainer {...props} {...this.props} />}
        />
        <Route
          exact
          path={ROUTE_STADISTICS}
          component={ChartsContainer}
        />
        <Switch>
          <Route
            exact
            path={ROUTE_TASK}
            render={props => <ToDoListContainer {...props} {...this.props} />}
          />
          <Route
            path={ROUTE_TASK_NEW}
            render={props =>
              <ToDoListContainer {...props} {...this.props} showModal />
            }
          />
          <Route
            path={ROUTE_TASK_EDIT}
            render={props =>
              <ToDoListContainer
                showModal
                {...props}
                {...this.props}
                taskId={props.match.params.id}
              />}
          />
          <Route
            path={ROUTE_TASK_DELETE}
            render={props =>
              <ToDoListContainer
                showDelete
                {...props}
                {...this.props}
                taskId={props.match.params.id}
              />}
          />
        </Switch>
      </>
    )
  }
}

Routes.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

export default withTasksData(Routes)
