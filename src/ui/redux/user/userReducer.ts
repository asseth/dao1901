import {createCallActionHandlers} from '../actionHandlerCreator'
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ...createCallActionHandlers('USER_ACCOUNTS'),
  ...createCallActionHandlers('USER_DEFAULT_ACCOUNT'),
  ...createCallActionHandlers('USER_BALANCE'),
}
// ------------------------------------
// Reducer
// ------------------------------------
export default function userReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}