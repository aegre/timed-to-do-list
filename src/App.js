import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import ToDoList from './components/ToDoList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader/>
        <ToDoList/>
      </div>
    );
  }
}

export default App;
