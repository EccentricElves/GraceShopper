import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store'

/**
 * COMPONENT
 */
class DisconnectedUserHome extends Component {
  constructor() {
    super()
    this.state = {
      edit: false,
      name: '',
      address: ''
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnClick() {
    this.setState({
      edit: true,
      name: this.props.user.name,
      address: this.props.user.address
    })
  }
  handleOnSubmit() {
    this.setState({
      edit: false
    })
    this.props.updateUser(
      this.props.user.id,
      this.state.name,
      this.state.address
    )
  }
  handleOnChange(event) {
    event.preventDefault()

    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const {user} = this.props

    return (
      <div>
        <h3>Welcome To Your Profile</h3>
        {!this.state.edit ? (
          <div>
            <div className="userPage">
              <div>
                <img src={user.userImage} />
              </div>
              <div className="userInfo">
                <ul>
                  <div>Name: {user.name}</div>
                  <div>Email Address: {user.email}</div>
                  <div>
                    Address: {user.address ? user.address : 'No address'}
                  </div>
                </ul>
              </div>
            </div>
            <button type="button" onClick={this.handleOnClick}>
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="userPage">
            <div>
              <img src={user.userImage} />
            </div>
            <div className="userInfo">
              <ul>
                <form onSubmit={this.handleOnSubmit}>
                  <div>
                    Name:
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name!"
                      value={this.state.name}
                      onChange={this.handleOnChange}
                    />
                  </div>
                  <div>Email Address: {user.email}</div>
                  <div>
                    Address:
                    <input
                      type="text"
                      name="address"
                      placeholder="Your Address!"
                      value={this.state.address}
                      onChange={this.handleOnChange}
                    />
                  </div>
                  <button type="submit">Save</button>
                </form>
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}
const mapDispatch = dispatch => ({
  updateUser: (id, name, address) =>
    dispatch(updateUserThunk(id, name, address))
})

const UserHome = connect(mapState, mapDispatch)(DisconnectedUserHome)

export default UserHome

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
