const initialState = {
  contracts: {},
  errors: [],
  members: [],
  txs: [],
}
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
    return {...state, contracts: action.contractsInfo}
  },
  ['FETCH_CONTRACTS_INFO_FAILED']: (state, action) => {
    return {...state, error: action.error}
  },
  ['FETCH_ALL_MEMBERS_SUCCEED']: (state, action) => {
    return {...state, members: action.members}
  },
  ['FETCH_ALL_MEMBERS_FAILED']: (state, action) => {
    const errorLog = {event: 'FETCH_ALL_MEMBERS_FAILED', message: action.e}
    const errors = [...state.errors, errorLog]
    return {...state, errors}
  },
  ['ADD_MEMBER_SUCCEED']: (state, action) => {
    const txLog = {event: 'ADD_MEMBER_SUCCEED', tx: action.tx}
    const txs = [...state.txs, txLog]
    const members = [...state.members, {
      memberAddress: action.memberAddress,
      endSubscriptionDate: action.endSubscriptionDate
    }]
    return {...state, members, txs}
  },
  ['ADD_MEMBER_FAILED']: (state, action) => {
    const errorLog = {event: 'ADD_MEMBER_FAILED', message: action.e}
    const errors = [...state.errors, errorLog]
    return {...state, errors}
  },
  ['REVOKE_MEMBER_SUCCEED']: (state, action) => {
    const txLog = {event: 'REVOKE_MEMBER_SUCCEED', tx: action.tx}
    const txs = [...state.txs, txLog]
    return {...state, txs}
  },
  ['REVOKE_MEMBER_FAILED']: (state, action) => {
    const errorLog = {event: 'REVOKE_MEMBER_FAILED', message: action.e}
    const errors = [...state.errors, errorLog]
    return {...state, errors}
  },
  ['TRANSFER_OWNERSHIP_SUCCEED']: (state, action) => {
    return {...state, ownerAddress: action.ownerAddress}
  },
}
// ------------------------------------
// Reducer
// ------------------------------------
export default function daoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}