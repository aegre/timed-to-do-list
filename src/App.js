import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';

import AppHeader from './components/AppHeader';
import ToDoListContainer from './containers/ToDoListContainer';
import { ROUTE_HOME, ROUTE_TASK, ROUTE_TASK_NEW, ROUTE_TASK_EDIT, ROUTE_TASK_DELETE } from './constants/routes';


class App extends Component {

  renderToDoContainerNew = () => <ToDoListContainer showEdit={true} />; 

  renderToDoContainerUpdate = props => <ToDoListContainer 
    showEdit={true}
    {...props} 
    taskId={props.match.params.id}
  />;

  renderToDoContainerDelete = props => <ToDoListContainer 
    showDelete={true}
    {...props}
    taskId={props.match.params.id}
  />;

  render() {
    return (
      <Router>
        <LastLocationProvider>
          <div className="App">
            <AppHeader/>
            <div className="content">
              <Route exact path={ROUTE_HOME} component={ToDoListContainer}/>
              <Switch>
                <Route exact path={ROUTE_TASK} component={ToDoListContainer}/>
                <Route path={ROUTE_TASK_NEW} component={this.renderToDoContainerNew}/>
                <Route path={ROUTE_TASK_EDIT} render={props => this.renderToDoContainerUpdate(props)}/>
                <Route path={ROUTE_TASK_DELETE} render={props => this.renderToDoContainerDelete(props)}/>
              </Switch>
            </div>
          </div>
        </LastLocationProvider>
      </Router>
    );
  }
}

export default App;
