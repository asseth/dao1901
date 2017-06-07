import 'babel-polyfill';
import {applyMiddleware, compose, createStore, combineReducers} from 'redux'
// ======================================================
// History
// ======================================================
import createHistory from 'history/createBrowserHistory'
export const history = createHistory()

import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
import {routerReducer, routerMiddleware} from 'react-router-redux'
const reduxRouterMiddleware = routerMiddleware(history)

import makeRootReducer from '../reducers'
//import { updateLocation } from './locationReducer'
import rootSaga from '../sagas/userSaga'


export default () => {
  // ======================================================
  // Prepare reducers
  // ======================================================
  let rootReducer = makeRootReducer()
  const reducers = combineReducers({
    rootReducer,
    routing: routerReducer
  })

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middlewares = [reduxRouterMiddleware, sagaMiddleware, thunkMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  // Get compose function from redux-devtools-extension if available
  const composeEnhancers =
          typeof window === 'object' &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose

  const enhancers = composeEnhancers(
    applyMiddleware(...middlewares),
    // other store enhancers if any
  )

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    reducers,
    enhancers
  )
  console.log('STORE INSTANCIATED')
  sagaMiddleware.run(rootSaga);

  /*
  store.asyncReducers = {}
  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  //store.unsubscribeHistory = browserHistory.listen(updateLocation(store))
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }
  */

  // ======================================================
  // Return the store
  // ======================================================
  return store
}
