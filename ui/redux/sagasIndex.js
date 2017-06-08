/**
 * Effects
 */
// call: block the saga until promise is resolved
// fork: run a task concurrently
// put: dispatch action to the store
// select: get state from redux store
// take: intercepts action dispatched to the store
// takeEvery: listen for dispatched actions and run them through the worker sagas
import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects'
import {watchGetBlockNumber} from './ethereum/ethereumSaga'
import {user} from './user/userSaga'
import Dao1901Contracts from 'dao1901-contracts';

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



/******************************************************************************/
/******************************* WORKERS SAGAS - Subroutines ******************/
/******************************************************************************/
let getDeployedContract = (contract) => {
  // Todo: warning web3 from window
  contract.setProvider(window.web3.currentProvider);
  return contract.deployed();
}

function* getDeployedContractsWorker() {
  try {
    const {Dao1901Members, Dao1901Votes, Owned} = Dao1901Contracts;
    const contracts = yield call(() => Promise.all([Dao1901Members, Dao1901Votes, Owned].map(getDeployedContract)));
    yield put({type: 'CONTRACTS_SUCCEED', contracts});
  } catch (e) {
    yield put({type: 'CONTRACTS_FAILED', message: e.message});
  }
}



export function* watchContracts() {
  yield takeEvery('CONTRACTS_REQUESTED', getDeployedContractsWorker)
}

function* bootstrap() {
  console.log('bootstrap ')
  yield put({type: 'USER_ACCOUNTS_REQUESTED'});
  yield put({type: 'BLOCK_NUMBER_REQUESTED'});
  yield put({type: 'CONTRACTS_REQUESTED'});
}

/******************************************************************************/
/******************************* ROOT SAGA ************************************/
/******************************************************************************/
export default function* rootSaga() {
  yield [
    fork(watchGetBlockNumber),
    fork(watchContracts),
    fork(user),
    fork(bootstrap)
  ]
}