import { combineReducers } from 'redux'
//import * as ActionTypes from '../actions'

/*
let initialState = {
  userAddress: web3.eth.defaultAccount
}
*/

function userAddress(state = {}, action) {
  switch (action.type) {
    case 'USER_ADDRESS_SUCCESS':
      return action.userAddress
    default:
      return state
  }
}

const rootReducer = combineReducers({
  userAddress
})

export default rootReducer