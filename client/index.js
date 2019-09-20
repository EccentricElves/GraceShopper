import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicatates
      position="bottom-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      closeOnToastrClick
    />
  </Provider>,
  document.getElementById('app')
)
