import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import ToDoListContainer from './containers/ToDoListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader/>
        <ToDoListContainer/>
      </div>
    );
  }
}

export default App;
