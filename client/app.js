import React from 'react'
import {Route} from 'react-router-dom'
import {Navbar, AllArt, SingleArtPage} from './components'
import thankYou from './components/thankYou'
import Cart from './components/cart'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <AllArt /> */}
      <Route exact path="/" component={AllArt} />
      <Route exact path="/art/:id" component={SingleArtPage} />
      <Route exact path="/thankyou" component={thankYou} />
      <Route exact path="/cart" component={Cart} />
    </div>
  )
}

export default App
