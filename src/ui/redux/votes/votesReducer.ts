const initialState = {
  errors: [],
  proposals: [],
  txs: [],
  votes: {}
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['CREATE_PROPOSAL_SUCCEED']: (state, action) => {
    const txLog = {event: 'CREATE_PROPOSAL_SUCCEED', tx: action.tx}
    const txs = [...state.txs, txLog]
    return {...state, txs}
  },
  ['CREATE_PROPOSAL_FAILED']: (state, action) => {
    const errorLog = {event: 'CREATE_PROPOSAL_FAILED', message: action.e}
    const errors = [...state.errors, errorLog]
    return {...state, errors}
  },
  ['FETCH_ALL_PROPOSALS_SUCCEED']: (state, action) => {
    return {...state, proposals: action.proposals}
  },
  ['FETCH_ALL_PROPOSALS_FAILED']: (state, action) => {
    const errorLog = {event: 'FETCH_ALL_PROPOSALS_FAILED', message: action.e}
    const errors = [...state.errors, errorLog]
    return {...state, errors}
  },
  ['FETCH_ALL_VOTES_FOR_ALL_PROPOSALS_SUCCEED']: (state, action) => {
    return {...state, votes: action.votes}
  },
  ['FETCH_ALL_VOTES_FOR_ALL_PROPOSALS_FAILED']: (state, action) => {
    const errorLog = {event: 'FETCH_ALL_VOTES_FOR_ALL_PROPOSALS_FAILED', message: action.e}
    const errors = [...state.errors, errorLog]
    return {...state, errors}  },
  ['VOTE_SUBMISSION_SUCCEED']: (state, action) => {
    const txLog = {event: 'VOTE_SUBMISSION_SUCCEED', tx: action.tx}
    const txs = [...state.txs, txLog]
    return {...state, txs}
  },
  ['VOTE_SUBMISSION_FAILED']: (state, action) => {
    const errorLog = {event: 'VOTE_SUBMISSION_FAILED', message: action.e}
    const errors = [...state.errors, errorLog]
    return {...state, errors}
  },
}
// ------------------------------------
// Reducer
// ------------------------------------
export default function votesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}