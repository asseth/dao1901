/*
- votes
  - proposals[]
    - proposal
      - id
      - isPassed
      - description
*/

const initialState = {
  proposals: [
    {
      id: null,
      isPassed: null,
      description: null
    }
  ]
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['CREATE_PROPOSAL_SUCCEED']: (state, action) => {
    return  {}
  },
  ['CREATE_PROPOSAL_FAILED']: (state, action) => {
    return  {errorMessage: action.errorMessage}
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function votesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}