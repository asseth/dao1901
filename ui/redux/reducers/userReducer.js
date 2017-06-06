/**
 * userAddress
 * @param state
 * @param action
 * @returns {*}
 */

export function userAddress(state = {}, action) {
  switch (action.type) {
    case 'USER_ADDRESS_SUCCESS':
      return action.userAddress
    default:
      return state
  }
}