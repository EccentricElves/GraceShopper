import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {
  Navbar,
  AllArt,
  SingleArtPage,
  Signup,
  Login,
  UserHome,
  ThankYou,
  Cart,
  OrderHistory
} from './components'
// import thankYou from './components/thankYou'
// import Cart from './components/cart'
// import OrderHistory from './components/orderHistory'

const App = () => {
  return (
    <div className="page">
      <Navbar />
      {/* <AllArt /> */}
      <div className="body">
        <Switch>
          <Route exact path="/" component={AllArt} />
          <Route exact path="/art/:id" component={SingleArtPage} />
          <Route exact path="/thankyou" component={ThankYou} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/user" component={UserHome} />
          <Route exact path="/orderhistory" component={OrderHistory} />
          <Route exact path="/thankyou" component={ThankYou} />
        </Switch>
      </div>
    </div>
  )
}

export default App
