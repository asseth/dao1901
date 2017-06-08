// ------------------------------------
// Actions
// ------------------------------------
export const members = {
  request: address => action(MEMBERS.REQUESTED, {address}),
  success: (address, response) => action(MEMBERS.SUCCEED, {address, response}),
  failure: (address, error) => action(MEMBERS.FAILED, {address, error}),
}