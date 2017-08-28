import {applyMiddleware, compose, createStore} from 'redux'
import * as blockchainConnect from '../blockchainConnect'
// ======================================================
// History
// ======================================================
import createHistory from 'history/createBrowserHistory'
export const history = createHistory()
// ======================================================
// Middlewares
// ======================================================
import {createLogger} from 'redux-logger'
const logger = createLogger({
  predicate: (getState, action) => !String(action.type).startsWith('@@redux-form')
})
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
import {routerMiddleware} from 'react-router-redux'
const reduxRouterMiddleware = routerMiddleware(history)
// ======================================================
// Reducers
// ======================================================
import makeRootReducer from './reducersIndex'
import rootSaga from './rootSaga'
// ======================================================
// Middleware Configuration
// ======================================================
const middlewares = [reduxRouterMiddleware, sagaMiddleware, logger]
// ======================================================
// Store Instantiation
// ======================================================
// Get compose function from redux-devtools-extension if available
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const store = composeEnhancers(applyMiddleware(...middlewares))(createStore)(makeRootReducer())
// ======================================================
// Blockchain Bootstrapping
// ======================================================
blockchainConnect.run()
  .then(() => sagaMiddleware.run(rootSaga))
  .catch(e => {throw new Error(e)})

export default store