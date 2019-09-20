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
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicatates
        position="top-left"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        closeOnToastrClick
      />
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
