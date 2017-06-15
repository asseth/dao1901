// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['DAO_OWNER_ADDRESS_SUCCEED']: (state, action) => {
    return {...state, ownerAddress: action.ownerAddress}
  },
  ['DAO_OWNER_ADDRESS_FAILED']: (state, action) => {
    return {...state, error: action.error}
  },
  ['FETCH_CONTRACTS_SUCCEED']: (state, action) => {
    let formSubState = (contract, i) => {
      let name = action.contracts[i].constructor.contract_name;
      // Put all in the store, todo ?
      return {[name]: contract}
    }
    let subStates = action.contracts.map(formSubState)
    return {...state, contract: Object.assign(...subStates)}
  },
  ['FETCH_CONTRACTS_FAILED']: (state, action) => {
    return {...state, error: action.error}
  },
  ['ADD_MEMBER_SUCCEED']: (state, action) => {
    return {...state}
  },
  ['ADD_MEMBER_FAILED']: (state, action) => {
    return {...state, error: action.error}
  },
  ['FETCH_ALL_MEMBERS_SUCCEED']: (state, action) => {
    return {...state, members: action.members}
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function daoReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}