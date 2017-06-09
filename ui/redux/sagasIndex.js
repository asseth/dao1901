/**
 * Effects
 */
// call: block the saga until promise is resolved
// fork: run a task concurrently
// put: dispatch action to the store
// select: get state from redux store
// take: intercepts action dispatched to the store
// takeEvery: listen for dispatched actions and run them through the worker sagas
import {call, fork, put, race, select, take, takeEvery} from 'redux-saga/effects'
import {watchContracts, watchFetchOwnerAddress} from './dao'
import {watchGetBlockNumber} from './ethereum/ethereumSaga'
import {user} from './user/userSaga'

/***************************** App State **************************************
- ethereum // from web3
 - blockNumber
 - numberOfPeers
- dao // from blockchain - Useful info for dao admin
 - ownerAddress
 - contract
   - owned
    - address
   - members
    - address
   - votes
    - address
- user // from web3
  - address
  - balance
- members // from blockchain
  - address
  - endSubscriptionDate
- votes // from blockchain
  - proposals
    - isPassed
    - description
*/

function* bootstrap() {
  console.log('bootstrap ')
  yield put({type: 'USER_ACCOUNTS_REQUESTED'});
  yield put({type: 'BLOCK_NUMBER_REQUESTED'});
  yield put({type: 'CONTRACTS_REQUESTED'});
  const { error } = yield race({
    success: take('CONTRACTS_SUCCEED'),
    error: take('CONTRACTS_FAILED'),
  })
  if (error) throw new Error(error)
  yield put({type: 'DAO_OWNER_ADDRESS_REQUESTED'});
}

/******************************************************************************/
/******************************* ROOT SAGA ************************************/
/******************************************************************************/
export default function* rootSaga() {
  yield [
    fork(watchGetBlockNumber),
    fork(watchFetchOwnerAddress),
    fork(watchContracts),
    fork(user),
    fork(bootstrap)
  ]
}