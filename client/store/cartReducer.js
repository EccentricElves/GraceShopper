import Axios from 'axios'

//Action Type
const ALL_CART = 'ALL_CART'
const CHECK_OUT = 'CHECK_OUT'
const ADDED_ART = 'ADDED_ART'
const REMOVED_ART = 'REMOVED_ART'

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

const removedArt = artId => ({
  type: REMOVED_ART,
  artId
})

//Thunk Creator
export const getCartThunk = () => {
  return async dispatch => {
    let localData = JSON.parse(localStorage.getItem('cart')) || {arts: []}
    try {
      const {data} = await Axios.post('/api/order/cart', localData)
      //if no error thrown, then localData is now in database
      //so lets delete the localStorage
      localStorage.removeItem('cart')
      dispatch(gotCart(data))
    } catch (error) {
      if (error.response.status === 403) {
        dispatch(gotCart(localData))
      }
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

export const removeArtFromCart = artId => {
  return async dispatch => {
    try {
      const {data} = await Axios.delete(`/api/order/cart/remove/${artId}`)
      dispatch(removedArt(data.id))
    } catch (error) {
      let myData = JSON.parse(localStorage.getItem('cart'))
      myData.arts = myData.arts.filter(art => art.id !== artId)
      localStorage.setItem('cart', JSON.stringify(myData))
      dispatch(removedArt(artId))
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
        dispatch(addedArt(data))
      }
    }
  }
}

//Cart Reducer
const cartReducer = (state = {cart: {arts: []}}, action) => {
  switch (action.type) {
    case ALL_CART:
      return {...state, cart: action.cart}
    case CHECK_OUT:
      return {...state, cart: {arts: []}}
    case REMOVED_ART: {
      let arts = state.cart.arts.filter(art => art.id !== action.artId)
      let cart = {...state.cart, arts}
      return {
        ...state,
        cart
      }
    }
    case ADDED_ART: {
      let index = state.cart.arts.findIndex(art => art.id === action.art.id)

      if (index === -1) {
        let arts = [...state.cart.arts, action.art]
        let cart = {...state.cart, arts}
        return {...state, cart}
      }
      return state
    }
    default:
      return state
  }
}

export default cartReducer
