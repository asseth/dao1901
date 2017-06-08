// ------------------------------------
// Actions
// ------------------------------------
export const userAddress = {
  request: () => action(USER_ADDRESS.REQUESTED),
  success: (address, response) => action(USER_ADDRESS.SUCCEED, {address, response}),
  failure: (address, error) => action(USER_ADDRESS.FAILED, {address, error}),
}