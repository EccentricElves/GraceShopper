import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {reducer as toastr} from 'react-redux-toastr'
import user from './user'
import artReducer from './allArtReducer'
import cartReducer from './cartReducer'

const reducer = combineReducers({user, artReducer, cartReducer, toastr})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
