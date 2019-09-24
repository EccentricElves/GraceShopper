import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect, Route} from 'react-router-dom'
import {getCartThunk, checkOutThunk} from '../store/cartReducer'
import thankYou from './thankYou'
import Checkout from './checkout'
import RemoveButton from './removeCartItem'

class DisconnectedCart extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getCart()
  }
  removeItem(id) {}
  handleSubmit() {
    this.props.checkOut()
  }
  render() {
    return this.props.cart ? (
      <div>
        <h1 className="firstorderfont">Cart</h1>
        {!this.props.cart.arts.length ? (
          <div className="firstorderfont">Cart Is Empty</div>
        ) : (
          <div>
            {this.props.cart.arts.map(item => {
              return (
                <ul key={item.id} className="cartList">
                  <img src={item.imageURL} className="cartImage" />
                  <div className="singleArtFont">Name: {item.name}</div>
                  <div className="singleArtFont">Artist: {item.artist}</div>
                  <div className="singleArtFont">Price: {item.price}</div>
                  <RemoveButton productId={item.id} />
                </ul>
              )
            })}
          </div>
        )}
        <div>
          {this.props.isLoggedIn ? (
            <Checkout
              name="Checkout"
              description="Checkout"
              amount={this.props.cart.arts.reduce(
                (accum, item) => accum + item.price,
                0
              )}
              handleCheckoutSuccess={this.props.checkOut}
            />
          ) : (
            <Link to="/signup">
              <button
                type="submit"
                className="hobbithandbutton"
                onClick={() => this.handleSubmit()}
              >
                Please Login/Signup First
              </button>
            </Link>
          )}
        </div>
      </div>
    ) : (
      <div className="firstorderfont">Cart Is Empty</div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cartReducer.cart,
  isLoggedIn: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCartThunk()),
  checkOut: () => dispatch(checkOutThunk())
})

const Cart = connect(mapStateToProps, mapDispatchToProps)(DisconnectedCart)

export default Cart
