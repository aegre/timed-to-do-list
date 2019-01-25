// Libraries
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import ToDoListContainer from 'containers/ToDoListContainer'
import { ROUTE_HOME, ROUTE_TASK, ROUTE_TASK_NEW, ROUTE_TASK_EDIT, ROUTE_TASK_DELETE, ROUTE_STADISTICS } from 'constants/routes'
import ChartsContainer from 'containers/ChartsContainer'

const Routes = () => {
  return (
    <React.Fragment>
      <Route
        exact
        path={ROUTE_HOME}
        component={ToDoListContainer}
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
          component={ToDoListContainer}
        />
        <Route
          path={ROUTE_TASK_NEW}
          render={props =>
            <ToDoListContainer {...props} showEdit />
          }
        />
        <Route
          path={ROUTE_TASK_EDIT}
          render={props =>
            <ToDoListContainer
              showEdit
              {...props}
              taskId={props.match.params.id}
            />}
        />
        <Route
          path={ROUTE_TASK_DELETE}
          render={props =>
            <ToDoListContainer
              showDelete
              {...props}
              taskId={props.match.params.id}
            />}
        />
      </Switch>

    </React.Fragment>

  )
}

Routes.propTypes = {
}

export default Routes
