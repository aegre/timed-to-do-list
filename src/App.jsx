import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'

import AppHeader from 'components/AppHeader'
import Routes from 'routes'

class App extends Component {
  render () {
    return (
      <Router>
        <LastLocationProvider>
          <div className='App'>
            <AppHeader />
            <div className='content'>
              <Routes />
            </div>
          </div>
        </LastLocationProvider>
      </Router>
    )
  }
}

export default App
