import { combineReducers } from 'redux'
import {routerReducer} from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import {reducer as toastrReducer} from 'react-redux-toastr'

import daoReducer from './dao/daoReducer'
import ethereumReducer from './ethereum/ethereumReducer'
import ipfsReducer from './ipfs/ipfsReducer'
import votesReducer from './votes/votesReducer'
import userReducer from './user/userReducer'

/***************************** App State **************************************
- ethereum - Technical info about the Ethereum blockchain
 - blockNumber
 - numberOfPeers

- dao - Useful info for dao admin
 - ownerAddress
 - contract
   - owned
    - address
   - members
    - address
   - votes
    - address
 - members[]
  - member
    - address
    - endSubscriptionDate

- user
  - address
  - balance

- votes
  - proposals[]
    - proposal
      - id
      - description
*/

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    dao: daoReducer,
    ethereum: ethereumReducer,
    form: formReducer,
    ipfs: ipfsReducer,
    routing: routerReducer,
    toastr: toastrReducer,
    user: userReducer,
    vote: votesReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer