import React, {Component} from 'react'
import {connect} from 'react-redux'

import {removeArtFromCart} from '../store/cartReducer'

class DisconnectedRemoveButton extends Component {
  constructor() {
    super()
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    this.props.removeFromCart(this.props.productId)
  }

  render() {
    return <button onClick={this.handleOnClick}>REMOVE FROM CART</button>
  }
}

const mapDispatch = dispatch => {
  return {
    removeFromCart(productId) {
      dispatch(removeArtFromCart(productId))
    }
  }
}

const ConnectedRemoveButton = connect(null, mapDispatch)(
  DisconnectedRemoveButton
)

export default ConnectedRemoveButton
