/**
 * userAddress
 * @param state
 * @param action
 * @returns {*}
 */

export default function userAddress(state = {a: 2}, action) {
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