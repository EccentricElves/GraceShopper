import Axios from 'axios'

//Action Type
const ALL_CART = 'ALL_CART'
const CHECK_OUT = 'CHECK_OUT'
const ADDED_ART = 'ADDED_ART'

//Action Creator
const gotCart = cart => ({
  type: ALL_CART,
  cart
})
const checkOut = cart => ({
  type: CHECK_OUT,
  cart
})
const addedArt = art => ({
  type: ADDED_ART,
  art
})

//Thunk Creator
export const getCartThunk = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/order/cart')
      dispatch(gotCart(data))
    } catch (error) {
      dispatch(gotCart(JSON.parse(localStorage.getItem('cart'))))
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
export const addArt = artId => {
  return async dispatch => {
    try {
      const {data} = await Axios.put(`/api/order/add/${artId}`)
      dispatch(addedArt(data))
    } catch (error) {
      let myData = JSON.parse(localStorage.getItem('cart')) || {arts: []}
      if (!myData.arts.map(x => x.id).includes(artId)) {
        const {data} = await Axios.get(`/api/art/${artId}`)
        myData.arts = myData.arts.concat(data)
        localStorage.setItem('cart', JSON.stringify(myData))
      }
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
    case ADDED_ART:
      return state
    default:
      return state
  }
}

export default cartReducer
