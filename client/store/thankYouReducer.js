import Axios from 'axios'

//Action Type
const THANK_YOU = 'THANK_YOU'

//Action Creator
const thankYou = orders => ({
  type: THANK_YOU,
  orders
})

//Thunk Creator
export const thankYouThunk = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/order/thankyou')
      dispatch(thankYou(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//Initial State
const initialState = {orders: []}

//Order History Reducer
const thankYouReducer = (state = initialState, action) => {
  switch (action.type) {
    case THANK_YOU:
      return {...state, orders: action.orders}
    default:
      return state
  }
}

export default thankYouReducer
