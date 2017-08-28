import {createCallActionHandlers} from '../actionHandlerCreator'
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ...createCallActionHandlers('BLOCK_NUMBER'),
  ...createCallActionHandlers('NETWORK_ID'),
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function ethereumReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}