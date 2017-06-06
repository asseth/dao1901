import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects'
import * as actions from '../actions'
const { USER_ADDRESS } = actions

/******************************************************************************/
/******************************* WORKERS SAGAS - Subroutines ******************/
/******************************************************************************/
// worker Saga: will be fired on REQUEST actions

// ========================================================
// Set default account
// ========================================================
let setDefaultAccount = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, accounts) => {
      if (err) reject(err.message);
      web3.eth.defaultAccount = accounts[0];
      console.log(`Set the default account to: ${web3.eth.defaultAccount}`);
      resolve(web3.eth.defaultAccount);
    });
  })
}

function* setDefaultAccountWorker() {
  try {
    const defaultAccount = yield call(setDefaultAccount)
    console.log('defaultAccount', defaultAccount)
    yield put({type: 'SET_DEFAULT_ACCOUNT_SUCCESS', defaultAccount})
  } catch (e) {
    yield put({type: 'SET_DEFAULT_ACCOUNT_FAILED', message: e.message});
  }
}

function* watchDefaultAccount() {
  yield takeEvery('SET_DEFAULT_ACCOUNT_REQUEST', setDefaultAccountWorker);
}


let fetchAddr = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, accounts) => {
      if (err) reject(err.message);
      resolve(accounts[1]);
    });
  })
}

function* fetchUserAddress(action) {
  try {
    const userAddress = yield call(fetchAddr);
    yield put({type: 'USER_ADDRESS_SUCCESS', userAddress});
  } catch (e) {
    yield put({type: 'USER_ADDRESS_FAILED', message: e.message});
  }
}

/******************************************************************************/
/**************************** WATCHERS SAGAS **********************************/
/******************************************************************************/

/*
 Starts fetchUser on each dispatched `USER_ADDRESS_REQUEST` action.
 */
function* watchFetchUserAddress() {
  yield takeEvery('USER_ADDRESS_REQUEST', fetchUserAddress);
}

function* bootstrap() {
  yield put({type: 'SET_DEFAULT_ACCOUNT_REQUEST'});
  yield put({type: 'USER_ADDRESS_REQUEST'});
}

/******************************************************************************/
/******************************* ROOT SAGA ************************************/
/******************************************************************************/
export default function* rootSaga() {
  yield [
    fork(watchFetchUserAddress),
    fork(watchDefaultAccount),
    fork(bootstrap)
  ]
}