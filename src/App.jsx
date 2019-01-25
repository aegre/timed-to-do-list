// Libraries
import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'

// Components
import AppHeader from 'components/AppHeader'
import Routes from 'routes'
import { TasksProvider } from 'contexts/Tasks'

class App extends Component {
  render () {
    return (
      <Router>
        <LastLocationProvider>
          <div className='App'>
            <AppHeader />
            <div className='content'>
              <TasksProvider>
                <Routes />
              </TasksProvider>
            </div>
          </div>
        </LastLocationProvider>
      </Router>
    )
  }
}

export default App
