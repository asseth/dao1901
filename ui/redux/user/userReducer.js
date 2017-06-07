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
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

export default function userReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}

/**
 * user
 * @param state
 * @param action
 * @returns {*}
 */
export function user (state, action) {
  switch (action.type) {
    case 'USER_ADDRESS_SUCCESS':
      return action.userAddress
    default:
      return state
  }
}

// Set defaultAccountBalance
//console.log('this.props.web3.eth.defaultAccount', this.props.web3.eth.defaultAccount)
//this.props.web3.eth.getBalance("0xf2daaaCcb8836033CAf3368B234DeB8D62946700", (err, balance) => {
//  if (err) throw new Error(err.message);
//  this.setState({defaultAccountBalance: this.props.web3.fromWei(balance, "ether").toString()});
//});