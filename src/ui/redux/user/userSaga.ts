// ========================================================
// User Sagas
// Current user management, login, ...
// ========================================================
import { delay } from 'redux-saga'
import {call, put, select, takeEvery} from 'redux-saga/lib/effects.js'
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
    yield put({type: 'USER_DEFAULT_ACCOUNT_SUCCEED', values: {defaultAccount}})
  }
}
// ========================================================
// Set user balance
// ========================================================
let setUserBalance = (user) => {
  return new Promise((resolve, reject) => {
    if (!user.defaultAccount) reject(new Error('No default account'))
    window.web3.eth.getBalance(user.defaultAccount, (e, balance) => {
      if (e) reject(e)
      resolve(window.web3.fromWei(balance, "ether").valueOf())
    })
  })
}
function* setUserBalanceWorker() {
  try {
    let user = yield select(s => s.user)
    const balance = yield call(setUserBalance, user)
    yield put({type: 'USER_BALANCE_SUCCEED', values: {balance}})
  } catch (e) {
    yield put({type: 'USER_BALANCE_FAILED', e: e.message})
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
    yield put({type: 'USER_ACCOUNTS_SUCCEED', values: {accounts}})
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
  let accounts = yield call(fetchAccounts)
  let defaultAccount = accounts[0]
  while (true) {
    try {
      yield call(delay, 2000)
      accounts = yield call(fetchAccounts)
      if (accounts[0] !== defaultAccount) {
        defaultAccount = accounts[0]
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
