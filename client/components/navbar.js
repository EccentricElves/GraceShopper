import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route, Switch, Redirect} from 'react-router-dom'
import {logout} from '../store'
import {Login, Signup} from './auth-form'
import Cart from './cart'
import thankYou from './thankYou'

const Navbar = ({handleClick, isLoggedIn, email, name, cartCount}) => {
  return (
    <div>
      <nav className="navbar">
        {isLoggedIn ? (
          <div className="leftnav">
            {/* The navbar will show these links after you log in */}
            <Link to="/" className="link">
              Home
            </Link>
            <div className="userNav">
              <h3 className="welcome">welcome, {name || email}</h3>
              <Link to="/user" className="user">
                {' '}
                View Profile
              </Link>
            </div>
            <a href="#" onClick={handleClick} className="link">
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/" className="link">
              home
            </Link>
            <Link to="/login" className="link">
              login
            </Link>
            <Link to="/signup" className="link">
              sign up
            </Link>
            <Switch />
          </div>
        )}
        <Link to="/cart">
          <img
            src="  /images/cart.png"
            alt="Cart Image"
            className="cartButton"
          />
          <div id="cartCount">{cartCount}</div>
        </Link>
        <div>
          <Link to="/orderHistory" className="link">
            order history
          </Link>
          <Link to="/cart">
            <img
              src="  /images/cart.png"
              alt="Cart Image"
              className="cartButton"
            />
          </Link>
        </div>
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
    name: state.user.name,
    cartCount: state.cartReducer.cart ? state.cartReducer.cart.arts.length : 0
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
