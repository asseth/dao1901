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

export default function ethereumReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}