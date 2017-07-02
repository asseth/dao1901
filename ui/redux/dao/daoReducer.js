// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['FETCH_OWNER_ADDRESS_SUCCEED']: (state, action) => {
    return {...state, ownerAddress: action.ownerAddress}
  },
  ['FETCH_OWNER_ADDRESS_FAILED']: (state, action) => {
    return {...state, error: action.error}
  },
  ['FETCH_CONTRACTS_INFO_SUCCEED']: (state, action) => {
    return {...state, contracts: action.contractsInfos}
  },
  ['FETCH_CONTRACTS_INFO_FAILED']: (state, action) => {
    return {...state, error: action.error}
  },
  ['ADD_MEMBER_FAILED']: (state, action) => {
    return {...state, error: action.error}
  },
  ['FETCH_ALL_MEMBERS_SUCCEED']: (state, action) => {
    return {...state, members: action.members}
  },
  ['TRANSFER_OWNERSHIP_SUCCEED']: (state, action) => {
    return {...state, ownerAddress: action.ownerAddress}
  },
}
// ------------------------------------
// Reducer
// ------------------------------------
export default function daoReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}