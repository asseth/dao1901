import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects'

// ========================================================
// Set user balance
// ========================================================
let setUserBalance = (state) => {
  const {user, web3Wrap} = state;
  return new Promise((resolve, reject) => {
    web3Wrap.web3.eth.getBalance(user.defaultAccount, (err, balance) => {
      if (err) reject(err.message);
      resolve(web3Wrap.web3.fromWei(balance, "ether").valueOf());
    });
  })
}

function* setUserBalanceWorker() {
  try {
    // Todo select only account & web3.eth.getBalance
    let state = yield select();
    const balance = yield call(setUserBalance, state)
    yield put({type: 'USER_BALANCE_SUCCEED', balance})
  } catch (e) {
    yield put({type: 'USER_BALANCE__FAILED', message: e.message});
  }
}

// ========================================================
// Get accounts
// ========================================================
let fetchAccounts = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, accounts) => {
      if (err) reject(err.message);
      resolve(accounts);
    });
  })
}

function* fetchUserAccountsWorker() {
  try {
    const accounts = yield call(fetchAccounts);
    yield put({type: 'USER_ACCOUNTS_SUCCEED', accounts});

    // Misc actions
    yield put({type: 'USER_DEFAULT_ACCOUNT_REQUESTED'});
    yield put({type: 'USER_BALANCE_REQUESTED'});

  } catch (e) {
    yield put({type: 'USER_ADDRESS_FAILED', message: e.message});
  }
}

// ========================================================
// Set user default account
// ========================================================
function* setUserDefaultAccountWorker() {
  let accounts = yield select(state => state.user.accounts);
  let defaultAccount = accounts[0];
  window.web3.eth.defaultAccount = defaultAccount;
  console.log(`Set the default account to: ${defaultAccount}`);
  yield put({type: 'USER_DEFAULT_ACCOUNT_SUCCEED', defaultAccount});
}

export default function* user() {
  yield takeEvery('USER_ACCOUNTS_REQUESTED', fetchUserAccountsWorker);
  yield takeEvery('USER_DEFAULT_ACCOUNT_REQUESTED', setUserDefaultAccountWorker);
  yield takeEvery('USER_BALANCE_REQUESTED', setUserBalanceWorker);
}
