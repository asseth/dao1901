import 'babel-polyfill';
import {applyMiddleware, compose, createStore, combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
import {routerReducer, routerMiddleware} from 'react-router-redux'

// ======================================================
// History
// ======================================================
import createHistory from 'history/createBrowserHistory'
// We're using a browser history
export const history = createHistory()

const reduxRouterMiddleware = routerMiddleware(history)
import rootReducer from '../reducers'
//import { updateLocation } from './locationReducer'
import rootSaga from '../sagas/userSaga'


export default (initialState = {}) => {
  const reducers = combineReducers({
    rootReducer,
    routing: routerReducer
  })


  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [reduxRouterMiddleware, sagaMiddleware
  ]
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  // Get compose function from redux-devtools-extension if available
  const composeEnhancers =
          typeof window === 'object' &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    reducers,
    //[...initialState, {routing: routerReducer}],
    ...initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
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
  return store
}
