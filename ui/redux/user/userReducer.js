/*
- user // from web3
  - address
  - balance
*/

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['USER_ACCOUNTS_SUCCEED']: (state, action) => {
    return  {accounts: action.accounts}
  },
  ['USER_BALANCE_SUCCESS']: (state, action) => {
    return  {userBalance: action.userBalance}
  },
  ['SET_USER_DEFAULT_ACCOUNT_SUCCEED']: (state, action) => {
    return {...state, defaultAccount: action.defaultAccount}
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

export default function userReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}