import { routerMiddleware, routerReducer } from 'react-router-redux'
import { applyMiddleware, compose, createStore, Store } from 'redux'
import * as reduxPromise from 'redux-promise'

import { localStorage, logger } from '../middleware'

import rootReducer from '../reducers'
import apolloClient from '../services/apolloClient'

export function configureStore(browserHistory, initialState?: IRootState): Store<IRootState> {
  const middleware = [logger, localStorage, apolloClient.middleware(), reduxPromise, routerMiddleware(browserHistory)]

  const enhancers = [applyMiddleware(...middleware)]

  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  const enhancer = composeEnhancers(...enhancers)

  const store = createStore(rootReducer, initialState, enhancer) as Store<IRootState>

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
