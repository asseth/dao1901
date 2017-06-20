import 'babel-polyfill';
import {applyMiddleware, compose, createStore} from 'redux'
import DevTools from '../components/common/DevTools'
import truffleConfig from '../../protocol/truffle.js'

// ======================================================
// History
// ======================================================
import createHistory from 'history/createBrowserHistory'
export const history = createHistory()
// ======================================================
// Middlewares
// ======================================================
import createSagaMiddleware from 'redux-saga'
export const sagaMiddleware = createSagaMiddleware()
import {routerMiddleware} from 'react-router-redux'
const reduxRouterMiddleware = routerMiddleware(history)
import logger from 'redux-logger'
// ======================================================
// Reducers
// ======================================================
import makeRootReducer from './reducersIndex'
import rootSaga from './sagasIndex'

export default () => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middlewares = [reduxRouterMiddleware, sagaMiddleware, logger]

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
  // Set Web3
  // ======================================================
  window.addEventListener('load', function() {
    // Set Web3
    let web3Location = `http://${truffleConfig.networks.development.host}:${truffleConfig.networks.development.port}`;
    if (typeof window.web3 !== 'undefined') {
      console.log('Web3 Detected on window')
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      console.log('No Web3 Detected \nSet Web3')
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      window.web3 = new Web3(new Web3.providers.HttpProvider(web3Location))
      console.log('web3 added to window')
    }
    // ======================================================
    // Run Sagas
    // ======================================================
    sagaMiddleware.run(rootSaga)
  })

  // ======================================================
  // Return the store
  // ======================================================
  return store
}
