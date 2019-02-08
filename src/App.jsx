// Libraries
import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'

// Components
import AppHeader from 'components/AppHeader'
import Routes from 'routes'
import { TasksProvider, TasksConsumer } from 'contexts/Tasks'
import Loading from 'components/Loading'

class App extends Component {
  render () {
    return (
      <Router>
        <LastLocationProvider>
          <div className='App'>
            <AppHeader />
            <div className='content'>
              <TasksProvider>
                <TasksConsumer>
                  {
                    ({ isLoading }) =>
                      isLoading
                        ? <Loading />
                        : <Routes />
                  }
                </TasksConsumer>
              </TasksProvider>
            </div>
          </div>
        </LastLocationProvider>
      </Router>
    )
  }
}

export default App
