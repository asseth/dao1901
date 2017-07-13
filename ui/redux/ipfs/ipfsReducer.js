const initialState = {}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['IPFS_ID_SUCCEED']: (state, action) => {
    return {...state, ...action.info}
  },
  ['IPFS_ID_FAILED']: (state, action) => {
    return {...state, error: action.e}
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
export default function ipfsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}