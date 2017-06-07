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