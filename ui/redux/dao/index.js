import {createRequestTypes} from '../actions'

// ------------------------------------
// Actions
// ------------------------------------
const DAO_OWNER_ADDRESS = createRequestTypes('DAO_OWNER_ADDRESS')

const DAO_CONTRACT_ADDRESS_OWNED = createRequestTypes('DAO_CONTRACT_ADDRESS_OWNED')
const DAO_CONTRACT_ADDRESS_MEMBERS = createRequestTypes('DAO_CONTRACT_ADDRESS_MEMBERS')
const DAO_CONTRACT_ADDRESS_VOTES = createRequestTypes('DAO_CONTRACT_ADDRESS_VOTES')

export const dao = {
  request: ownerAddress => action(DAO.REQUESTED, {ownerAddress}),
  success: (ownerAddress, response) => action(DAO.SUCCEED, {ownerAddress, response}),
  failure: (ownerAddress, error) => action(DAO.FAILED, {ownerAddress, error}),
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['BLOCK_NUMBER_SUCCEED']: (state, action) => {
    return  {blockNumber: action.currentBlockNumber}
  },
  ['BLOCK_NUMBER_FAILED']: (state, action) => {
    return  {errorMessage: action.errorMessage}
  }
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