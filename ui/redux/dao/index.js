/*
- dao // from blockchain - Useful info for dao admin
 - ownerAddress
 - contract
   - owned
    - address
   - members
    - address
   - votes
    - address
*/

// ------------------------------------
// Actions
// ------------------------------------
export const daoOwnerAddress = {
  request: ownerAddress => action('DAO_OWNER_ADDRESS', {ownerAddress}),
  success: (ownerAddress, response) => action('DAO_OWNER_SUCCEED', {ownerAddress, response}),
  failure: (ownerAddress, error) => action('DAO_OWNER_FAILED', {ownerAddress, error}),
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['DAO_OWNER_ADDRESS']: (state, action) => {
    return  {ownerAddress: action.blockNumber}
  },
  ['DAO_CONTRACT_ADDRESS_OWNED']: (state, action) => {
    return  {contract: {owned: action.ownedContractAddress}}
  },
  ['DAO_CONTRACT_ADDRESS_MEMBERS']: (state, action) => {
    return  {contract: {owned: action.membersContractAddress}}
  },
  ['DAO_CONTRACT_ADDRESS_VOTES']: (state, action) => {
    return  {contract: {votes: action.votesContractAddress}}
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function daoReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}

// Get Owned instance
/*
 try {
 console.log('contracts', contracts)
 contracts.Owned.setProvider(this.props.web3.currentProvider);
 Owned = await contracts.Owned.deployed();
 this.setState({owner: await Owned.owner()});
 }
 catch (err) {
 throw new Error(err.message);
 }
 */