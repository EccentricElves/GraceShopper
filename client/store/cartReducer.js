import Axios from 'axios'

//Action Type
const ALL_CART = 'ALL_CART'
const CHECK_OUT = 'CHECK_OUT'

//Action Creator
const gotCart = cart => ({
  type: ALL_CART,
  cart
})
const checkOut = cart => ({
  type: CHECK_OUT,
  cart
})
//Thunk Creator
export const getCartThunk = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/order/cart')
      if (data) dispatch(gotCart(data))
      else dispatch(gotCart(window.localStorage.getItem('cart')))
    } catch (error) {
      console.log(error)
    }
  }
}
export const checkOutThunk = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.put('/api/order/cart')
      dispatch(checkOut(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//Cart Reducer
const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_CART:
      return {...state, cart: action.cart}
    case CHECK_OUT:
      return {...state, cart: action.cart}
    default:
      return state
  }
}

export default cartReducer
