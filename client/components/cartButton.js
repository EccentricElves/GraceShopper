import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr'

import {addArt} from '../store/cartReducer'

class DisconnectedCartButton extends Component {
  constructor() {
    super()
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    this.props.addToCart(this.props.productId)
    toastr.success('Nice!', 'You have added an Item to your Cart')
  }

  render() {
    return <button onClick={this.handleOnClick}>ADD TO CART</button>
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart(productId) {
      dispatch(addArt(productId))
    }
  }
}

const ConnectedCartButton = connect(null, mapDispatch)(DisconnectedCartButton)

export default ConnectedCartButton
