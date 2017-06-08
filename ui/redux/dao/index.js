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
// Sagas
// ------------------------------------
let fetchOwnerAddress = async () => {
  let Owned = await contracts.Owned.deployed();
  console.log('Owned', Owned)
}



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['DAO_OWNER_ADDRESS_SUCCEED']: (state, action) => {
    return  {ownerAddress: action.ownerAddress}
  },
  ['CONTRACTS_SUCCEED']: (state, action) => {
    let formSubState = (contract, i) => {
      let name = action.contracts[i].constructor.contract_name;
      // Put all in the store, todo ?
      return {[name]: contract}
    }
    let subStates = action.contracts.map(formSubState);
    return {contract: Object.assign(...subStates)};
  },
  ['DAO_CONTRACT_ADDRESS_OWNED_SUCCEED']: (state, action) => {
    return  {contract: {owned: action.ownedContractAddress}}
  },
  ['DAO_CONTRACT_ADDRESS_MEMBERS_SUCCEED']: (state, action) => {
    return  {contract: {owned: action.membersContractAddress}}
  },
  ['DAO_CONTRACT_ADDRESS_VOTES_SUCCEED']: (state, action) => {
    return  {contract: {votes: action.votesContractAddress}}
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function daoReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}