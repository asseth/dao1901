// For Ethereum transactions
export const createTxActionHandlers = (actionName) => {
  return {
    // Keep the tx id in Redux store and optional values
    [`${actionName}_SUCCEED`]: (state, action: {tx: string, values?: object}) => {
      const {values, tx} = action
      const txLog = {event: `${actionName}_SUCCEED`, tx}
      const txs = [...state.txs, txLog]
      return {...state, txs, ...values}
    },
    // Keep the error in Redux store
    [`${actionName}_FAILED`]: (state, action: {e: string}) => {
      const errorLog = {event: `${actionName}_FAILED`, message: action.e}
      const errors = [...state.errors, errorLog]
      return {...state, errors}
    }
  }
}

// For Ethereum constant functions
export const createCallActionHandlers = (actionName) => {
  return {
    [`${actionName}_SUCCEED`]: (state, action: {values: object}) => {
      const {values} = action
      return {...state, ...values}
    },
    [`${actionName}_FAILED`]: (state, action: {e: string}) => {
      const errorLog = {event: `${actionName}_FAILED`, message: action.e}
      const errors = [...state.errors, errorLog]
      return {...state, errors}
    }
  }
}