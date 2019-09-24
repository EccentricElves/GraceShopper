import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props
  console.log(user)

  return (
    <div>
      <h3>Welcome To Your Profile</h3>
      <div className="userPage">
        <div>
          <img src={user.userImage} />
        </div>
        <div className="userInfo">
          <ul>
            <div>Name: {user.name}</div>
            <div>Email Address: {user.email}</div>
            <div>Address: {user.address ? user.address : 'No address'}</div>
          </ul>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
