import { combineReducers } from 'redux'
import {routerReducer} from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import web3Reducer from './web3'
import daoReducer from './dao/index'
import ethereumReducer from './ethereum/ethereumReducer'
import votesReducer from './votes/votesReducer'
import userReducer from './user/userReducer'

/***************************** App State **************************************
- ethereum // from web3
 - blockNumber
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
- vote // from blockchain
  - proposals
    - isPassed
    - description
*/

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    dao: daoReducer,
    ethereum: ethereumReducer,
    form: formReducer,
    routing: routerReducer,
    user: userReducer,
    vote: votesReducer,
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