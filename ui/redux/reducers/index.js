import { combineReducers } from 'redux'
import {routerReducer} from 'react-router-redux'
import web3Reducer from '../web3'
import userAddress from './userReducer'

/***************************** App State **************************************
- ethereum // from web3
 - currentBlockNumber
 - currentProvider
 - numberOfPeers
- dao // from blockchain - Useful info for dao admin
 - ownerAddress
 - contract
   - owned
    - address
   - members
    - address
   - votes
    - address
- user // from web3
  - address
  - balance
- members // from blockchain
  - address
  - endSubscriptionDate
- votes // from blockchain
  - proposals
    - isPassed
    - description
*/

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    routing: routerReducer,
    userAddress,
    web3Wrap: web3Reducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer