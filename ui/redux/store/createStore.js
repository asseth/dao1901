import 'babel-polyfill';
import {applyMiddleware, compose, createStore} from 'redux'
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
const sagaMiddleware = createSagaMiddleware()
import {routerMiddleware} from 'react-router-redux'
const reduxRouterMiddleware = routerMiddleware(history)
// ======================================================
// Reducers
// ======================================================
import makeRootReducer, {injectReducer} from '../reducers/index'
import rootSaga from '../sagas/userSaga'


export default () => {
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
  // Store Instantiation
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    enhancers
  )
  console.log('STORE INSTANCIATED')
  sagaMiddleware.run(rootSaga);

  // ======================================================
  // HMR Setup
  // ======================================================
  store.asyncReducers = {}
  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  //store.unsubscribeHistory = browserHistory.listen(updateLocation(store))
  if (module.hot) {
    module.hot.accept('../reducers', injectReducer(store.asyncReducers))
  }

  // ======================================================
  // Return the store
  // ======================================================
  return store
}
