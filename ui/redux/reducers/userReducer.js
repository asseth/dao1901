/**
 * userAddress
 * @param state
 * @param action
 * @returns {*}
 */

export function userAddress(state = {a: 2}, action) {
  switch (action.type) {
    case 'USER_ADDRESS_SUCCESS':
      return action.userAddress
    default:
      return state
  }
}