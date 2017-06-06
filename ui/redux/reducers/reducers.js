import { combineReducers } from 'redux'
import locationReducer from './locationReducer'
import web3Reducer from './web3Reducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    web3Wrap: web3Reducer,
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
