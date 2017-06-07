import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects'

// Set defaultAccountBalance
//console.log('this.props.web3.eth.defaultAccount', this.props.web3.eth.defaultAccount)
//this.props.web3.eth.getBalance("0xf2daaaCcb8836033CAf3368B234DeB8D62946700", (err, balance) => {
//  if (err) throw new Error(err.message);
//  this.setState({defaultAccountBalance: this.props.web3.fromWei(balance, "ether").toString()});
//});

// ========================================================
// Get user balance
// ========================================================
let getUserBalance = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(web3.eth.defaultAccount, (err, balance) => {
      if (err) reject(err.message);
      console.log(`Set the default account to: ${web3.eth.defaultAccount}`);
      resolve(balance);
    });
  })
}

// worker Saga: will be fired on REQUEST actions
function* getUserBalanceWorker() {
  try {
    const balance = yield call(getUserBalance)
    console.log('balance', balance)
    console.log(web3.fromWei(balance, "ether").toString())
    yield put({type: 'USER_BALANCE_SUCCESS', balance})
  } catch (e) {
    yield put({type: 'USER_BALANCE__FAILED', message: e.message});
  }
}

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

// ========================================================
// Get accounts
// ========================================================
let getAccounts = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, accounts) => {
      if (err) reject(err.message);
      resolve(accounts);
    });
  })
}

function* fetchUserAddressWorker() {
  try {
    const accounts = yield call(getAccounts);
    const userAddress = accounts[0];
    yield put({type: 'USER_ADDRESS_SUCCESS', userAddress});
  } catch (e) {
    yield put({type: 'USER_ADDRESS_FAILED', message: e.message});
  }
}

// Starts fetchUserAddressWorker on each dispatched `USER_ADDRESS_REQUEST` action
function* watchFetchUserAddress() {
  yield takeEvery('USER_ADDRESS_REQUEST', fetchUserAddressWorker);
}

export default {
  watchFetchUserAddress,
  watchDefaultAccount
}