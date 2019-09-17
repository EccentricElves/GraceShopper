import React from 'react'
import {Route} from 'react-router-dom'
import {Navbar, AllArt, SingleArtPage} from './components'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <AllArt /> */}
      <Route exact path="/" component={AllArt} />
      <Route exact path="/art/:id" component={SingleArtPage} />
    </div>
  )
}

export default App
