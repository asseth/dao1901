/**
 * Effects
 */
// call: block the saga until promise is resolved
// fork: run a task concurrently
// put: dispatch action to the store
// select: get state from redux store
// take: intercepts action dispatched to the store
// takeEvery:
import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects'
import watchGetEthereumCurrentBlockNumber from './ethereum/ethereumSaga'
import contracts from 'dao1901-contracts';

/***************************** App State **************************************
- ethereum // from web3
 - currentBlockNumber
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
/*async getContractAddressOwner() {
  try {
    return await contracts.Owned.deployed();
  } catch (err) {
    throw new Error(err.message);
  }
}

async getContractAddressMembers() {
  try {
    return await contracts.Dao1901Members.deployed();
  } catch (err) {
    throw new Error(err.message);
  }
}

async getContractAddressVote() {
  try {
    return await contracts.Dao1901Votes.deployed();
  } catch (err) {
    throw new Error(err.message);
  }
}
*/

// Our worker Saga: will perform the async increment task
function* getContractAddressOwner() {
  yield contracts.Owned.deployed()
  yield put({ type: 'CONTRACT_ADDRESS_OWNER_SUCCEEDED' })
  // CONTRACT_ADDRESS_OWNER_FAILED
}

function* getUserAddress() {
  yield web3.eth.defaultAccount
  yield put({ type: 'USER_ADDRESS_SUCCEEDED' })
  // USER_ADDRESS_FAILED
}

/******************************************************************************/
/**************************** WATCHERS SAGAS **********************************/
/******************************************************************************/
/******************************* USER  ****************************************/
/******************************************************************************/
// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchUserAddress() {
  // takeEvery: Listen for dispatched actions and run them through the worker sagas
  yield takeEvery({USER_ADDRESS_SUCCEEDED}, getUserAddress)
}

/******************************************************************************/
/**************************** MEMBERS *****************************************/
/******************************************************************************/

/******************************************************************************/
/**************************** DAO *********************************************/
/******************************************************************************/

export function* watchContractAddressOwner() {
  // takeEvery: Listen for dispatched actions and run them through the worker sagas
  yield takeEvery('DAO_OWNER_ADDRESS_SUCCEEDED', getContractAddressOwner)
  // DAO_OWNER_ADDRESS_FAILED
}

function* bootstrap() {
  console.log('bootstrap ')
  yield put({type: 'SET_DEFAULT_ACCOUNT_REQUEST'});
  yield put({type: 'USER_ADDRESS_REQUEST'});
  yield put({type: 'BLOCK_NUMBER_REQUESTED'});
}

/******************************************************************************/
/******************************* ROOT SAGA ************************************/
/******************************************************************************/
export default function* rootSaga() {
  yield [
    fork(watchContractAddressOwner),
    fork(watchGetEthereumCurrentBlockNumber),
    fork(bootstrap)
  ]
}