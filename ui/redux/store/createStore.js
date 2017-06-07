import 'babel-polyfill';
import {applyMiddleware, compose, createStore} from 'redux'
import DevTools from '../../containers/DevTools';
// ======================================================
// History
// ======================================================
import createHistory from 'history/createBrowserHistory'
export const history = createHistory()
// ======================================================
// Middlewares
// ======================================================
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
export const sagaMiddleware = createSagaMiddleware()
import {routerMiddleware} from 'react-router-redux'
const reduxRouterMiddleware = routerMiddleware(history)
// ======================================================
// Reducers
// ======================================================
import makeRootReducer, {injectReducer} from '../reducers/index'


export default () => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middlewares = [reduxRouterMiddleware, sagaMiddleware, thunkMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  // Get compose function from redux-devtools-extension if available
  // Todo Not used because of weird bug - it triggers eth_protocolVersion ethereum json-rpc on open
  const composeEnhancers =
          typeof window === 'object' &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose

  const enhancers = compose(
    applyMiddleware(...middlewares),
    DevTools.instrument()
  )

  // ======================================================
  // Store Instantiation
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    enhancers
  )

  // ======================================================
  // HMR Setup
  // ======================================================
  //store.asyncReducers = {}
  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  //store.unsubscribeHistory = browserHistory.listen(updateLocation(store))
  /*if (module.hot) {
    console.log('HMR activated')
    module.hot.accept('../reducers', injectReducer(store.asyncReducers))
  }*/

  // ======================================================
  // Return the store
  // ======================================================
  return store
}
