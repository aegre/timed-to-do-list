import React, { Component } from 'react';
import AppHeader from './components/AppHeader';
import ToDoListContainer from './containers/ToDoListContainer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ROUTE_HOME, ROUTE_TASK, ROUTE_TASK_NEW, ROUTE_TASK_UPDATE } from './constants/routes';

class App extends Component {

  renderToDoContainerNew = () => <ToDoListContainer showEdit={true} />; 
  renderToDoContainerUpdate = props => <ToDoListContainer 
    showEdit={true}
    {...props} 
    taskId={props.match.params.id}
  />;

  render() {
    return (
      <Router>
        <div className="App">
          <AppHeader/>
          <div className="content">
            <Route exact path={ROUTE_HOME} component={ToDoListContainer}/>
            <Switch>
              <Route exact path={ROUTE_TASK} component={ToDoListContainer}/>
              <Route path={ROUTE_TASK_NEW} component={this.renderToDoContainerNew}/>
              <Route path={ROUTE_TASK_UPDATE} render={props => this.renderToDoContainerUpdate(props) }/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
