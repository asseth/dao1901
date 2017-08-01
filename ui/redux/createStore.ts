import Dao1901Contracts from 'dao1901-contracts'

//console.log('Dao1901Contracts', Dao1901Contracts);
import {applyMiddleware, compose, createStore} from 'redux'
//import DevTools from '../components/common/DevTools'
//import * as truffleConfig from '../../protocol/truffle.js'
const truffleConfig = require('../../protocol/truffle.js')
console.log("truffleConfig", truffleConfig);
// ======================================================
// History
// ======================================================
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()
// ======================================================
// Middlewares
// ======================================================
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
import {routerMiddleware} from 'react-router-redux'

const reduxRouterMiddleware = routerMiddleware(history)
import logger from 'redux-logger'
// ======================================================
// Reducers
// ======================================================
import makeRootReducer from './reducersIndex'
import rootSaga from './rootSaga'
// ======================================================
// Ready to use smart contracts
// ======================================================
export let contracts = {}
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

const finalCreateStore = composeEnhancers(
    applyMiddleware(...middlewares),
    //DevTools.instrument()
)(createStore)
// ======================================================
// Store Instantiation
// ======================================================
const store = finalCreateStore(makeRootReducer());

// ======================================================
// Set Web3
// ======================================================
window.addEventListener('load', function () {
    // Set Web3
    let web3Location = `http://${truffleConfig.networks.development.host}:${truffleConfig.networks.development.port}`
    if (typeof window.web3 !== 'undefined') {
        console.log('Web3 detected on window')
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
        console.log('No Web3 detected \nSet Web3')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider(web3Location))
        console.log('web3 added to window')
    }
    // ======================================================
    // Prepare smart contracts
    // ======================================================
    const {Dao1901Members, Dao1901Votes, Owned} = Dao1901Contracts
    Promise.all([Dao1901Members, Dao1901Votes, Owned]
        .map((contract) => {
            contract.setProvider(window.web3.currentProvider)
            return contract.deployed()
        }))
        .then((deployedContracts) => {
            deployedContracts.forEach(function (contract) {
                // Add name property to the object
                let name = contract.constructor.contract_name
                contract['name'] = name
                // Add each contract to exported contracts
                contracts[name] = contract
            })
            console.log('Smart contracts ready')
        })
        .then(() => {
            // ======================================================
            // Run Sagas
            // ======================================================
            sagaMiddleware.run(rootSaga)
        })
})
export default store