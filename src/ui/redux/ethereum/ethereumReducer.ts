// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['BLOCK_NUMBER_SUCCEED']: (state, action) => {
    return  {...state, blockNumber: action.blockNumber}
  },
  ['BLOCK_NUMBER_FAILED']: (state, action) => {
    return  {...state, errorMessage: action.errorMessage}
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function ethereumReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}