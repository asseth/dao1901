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
//import userSagas, { watchFetchUserAddress, watchDefaultAccount} from './user/userSaga'
import {user} from './user/userSaga'
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



export function* watchContractAddressOwner() {
  yield takeEvery('DAO_OWNER_ADDRESS_SUCCEED', getContractAddressOwner)
}

function* bootstrap() {
  console.log('bootstrap ')
  yield put({type: 'USER_ACCOUNTS_REQUESTED'});
  yield put({type: 'BLOCK_NUMBER_REQUESTED'});
}

/******************************************************************************/
/******************************* ROOT SAGA ************************************/
/******************************************************************************/
export default function* rootSaga() {
  yield [
    fork(watchContractAddressOwner),
    fork(watchGetBlockNumber),
    fork(user),
    fork(bootstrap)
  ]
}