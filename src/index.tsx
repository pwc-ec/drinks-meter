import './img/favicon.ico'

import { createBrowserHistory } from 'history'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux'

import App from './containers/App'
import apolloClient from './services/apolloClient'
import { configureStore } from './store'

const bowserHistory = createBrowserHistory()

const store = configureStore(bowserHistory)
const history = createBrowserHistory()

ReactDOM.render(
  <ApolloProvider store={store} client={apolloClient}>
    <Router history={history}>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
