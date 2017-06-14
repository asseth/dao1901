/*
- votes
  - proposals[]
    - proposal
      - id
      - isPassed
      - description
*/

const initialState = {}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['CREATE_PROPOSAL_SUCCEED']: (state, action) => {
    return  {...state}
  },
  ['CREATE_PROPOSAL_FAILED']: (state, action) => {
    return  {...state, errorMessage: action.errorMessage}
  },
  ['GET_ALL_PROPOSALS_SUCCEED']: (state, action) => {
    return {...state, proposals: action.proposals}
  },
  ['GET_ALL_PROPOSALS_FAILED']: (state, action) => {
    return {...state, error: action.error}
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function votesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}