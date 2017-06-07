/*
- user // from web3
  - address
  - balance
*/

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['USER_ADDRESS_SUCCESS']: (state, action) => {
    return  {userAddress: action.userAddress}
  },
  ['USER_BALANCE_SUCCESS']: (state, action) => {
    return  {userBalance: action.userBalance}
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

export default function userReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}