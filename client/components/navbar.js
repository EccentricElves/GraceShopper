import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route, Switch, Redirect} from 'react-router-dom'
import {logout} from '../store'
import {Login, Signup} from './auth-form'
import Cart from './cart'
import thankYou from './thankYou'

const Navbar = ({handleClick, isLoggedIn, email, name}) => {
  return (
    <div>
      <h1>Eccentric Elves Arts</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <h3>Welcome, {name}</h3>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Switch>
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        )}
        <Link to="/cart" className="cartButton">
          <img
            className="cartButton"
            src="https://static.turbosquid.com/Preview/2015/08/13__15_44_40/picter01.jpg31cab069-a003-4ef9-9721-43a9a1e5e110Zoom.jpg"
          />
        </Link>
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email,
    name: state.user.name
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
