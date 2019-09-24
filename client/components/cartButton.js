import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'

import {addArt} from '../store/cartReducer'

class DisconnectedCartButton extends Component {
  constructor() {
    super()
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    this.props.addToCart(this.props.productId)
    toast.success('Item Added To Cart', {
      position: 'top-right',
      autoClose: 3000,
      closeOnClick: true,
      hideProgressBar: true
    })
  }

  render() {
    return (
      <button onClick={this.handleOnClick} className="hobbithandbutton">
        ADD TO CART
      </button>
    )
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
