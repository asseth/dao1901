/**
 * Effects
 */
// call:
// fork:
// put:
// select:
// take:
// takeEvery:
import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects'
//import { api, history } from '../services'
import * as actions from '../actions'
//const { connexion, members, organization, userAddress } = actions
const { USER_ADDRESS } = actions

import contracts from 'dao1901-contracts';
//import {CONNEXION} from '../actions'

//import { getUser, getRepo, getStarredByUser, getStargazersByRepo } from '../reducers/selectors'


/***************************** App State **************************************
- ethereum // from web3
 - currentBlockNumber
 - currentProvider
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
/**************************** CONNEXION ***************************************/
/******************************************************************************/

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



// trigger router navigation via history
function* watchNavigate() {
  while(true) {
    const {pathname} = yield take(actions.NAVIGATE)
    yield history.push(pathname)
  }
}

// Fetches data for a User : user data + starred repos
function* watchLoadUserPage() {
  while(true) {
    const {login, requiredFields = []} = yield take(actions.LOAD_USER_PAGE)

    yield fork(loadUser, login, requiredFields)
    yield fork(loadStarred, login)
  }
}

/******************************************************************************/
/******************************* ROOT SAGA ************************************/
/******************************************************************************/
export default function* rootSaga() {
  yield [
    fork(watchContractAddressOwner)
  ]
}