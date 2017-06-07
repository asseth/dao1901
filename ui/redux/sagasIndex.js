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
import userSagas from './user/userSaga'
import contracts from 'dao1901-contracts';

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

function* getContractAddressOwner() {
  yield contracts.Owned.deployed()
  yield put({ type: 'CONTRACT_ADDRESS_OWNER_SUCCEEDED' })
}

function* getUserAddress() {
  yield web3.eth.defaultAccount
  yield put({ type: 'USER_ADDRESS_SUCCEEDED' })
}

export function* watchUserAddress() {
  yield takeEvery({USER_ADDRESS_SUCCEEDED}, getUserAddress)
}



export function* watchContractAddressOwner() {
  yield takeEvery('DAO_OWNER_ADDRESS_SUCCEEDED', getContractAddressOwner)
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
    fork(watchGetBlockNumber),
    fork(bootstrap)
  ]
}