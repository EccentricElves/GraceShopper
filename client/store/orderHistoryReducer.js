import Axios from 'axios'

//Action Type
const GOT_HISTORY = 'GOT_HISTORY'

//Action Creator
const gotHistory = orders => ({
  type: GOT_HISTORY,
  orders
})

//Thunk Creator
export const getOrderHistoryThunk = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/order/history')
      dispatch(gotHistory(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//Initial State
const initialState = {orders: []}

//Order History Reducer
const orderHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_HISTORY:
      return {...state, orders: action.orders}
    default:
      return state
  }
}

export default orderHistoryReducer
