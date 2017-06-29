// ========================================================
// User Sagas
// ========================================================
import { delay } from 'redux-saga'
import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects'
// ========================================================
// Set user default account
// ========================================================
function* setUserDefaultAccountWorker() {
  let accounts = yield select(state => state.user.accounts)
  if (accounts.length === 0) {
    yield put({type: 'USER_DEFAULT_ACCOUNT_FAILED', error: 'No accounts'})
  } else {
    let defaultAccount = accounts[0]
    window.web3.eth.defaultAccount = defaultAccount
    yield put({type: 'USER_DEFAULT_ACCOUNT_SUCCEED', defaultAccount})
  }
}
// ========================================================
// Set user balance
// ========================================================
let setUserBalance = (user) => {
  return new Promise((resolve, reject) => {
    if (!user.defaultAccount) reject(new Error('No default account'))
    window.web3.eth.getBalance(user.defaultAccount, (err, balance) => {
      if (err) reject(err.message)
      resolve(window.web3.fromWei(balance, "ether").valueOf())
    })
  })
}
function* setUserBalanceWorker() {
  try {
    let user = yield select(s => s.user)
    const balance = yield call(setUserBalance, user)
    yield put({type: 'USER_BALANCE_SUCCEED', balance})
  } catch (e) {
    yield put({type: 'USER_BALANCE__FAILED', error: e})
  }
}
// ========================================================
// Get accounts
// ========================================================
let fetchAccounts = () => {
  return new Promise((resolve, reject) => {
    window.web3.eth.getAccounts((e, accounts) => {
      if (e) reject(e.message)
      resolve(accounts)
    })
  })
}
function* fetchUserAccountsWorker() {
  try {
    const accounts = yield call(fetchAccounts)
    yield put({type: 'USER_ACCOUNTS_SUCCEED', accounts})
    // Misc actions
    yield put({type: 'USER_DEFAULT_ACCOUNT_REQUESTED'})
    yield put({type: 'USER_BALANCE_REQUESTED'})
  } catch (e) {
    yield put({type: 'USER_ADDRESS_FAILED', error: e})
  }
}
// ========================================================
// Watch default account change
// ========================================================
export function* watchDefaultAccountChange() {
  let defaultAccount = window.web3.eth.accounts[0]
  while (true) {
    try {
      yield call(delay, 2000)
      if (window.web3.eth.accounts[0] !== defaultAccount) {
        defaultAccount = window.web3.eth.accounts[0]
        yield put({type: 'USER_ACCOUNTS_REQUESTED'})
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}
// ========================================================
// Watch user sagas
// ========================================================
export default function* user() {
  yield takeEvery('USER_ACCOUNTS_REQUESTED', fetchUserAccountsWorker)
  yield takeEvery('USER_DEFAULT_ACCOUNT_REQUESTED', setUserDefaultAccountWorker)
  yield takeEvery('USER_BALANCE_REQUESTED', setUserBalanceWorker)
}
