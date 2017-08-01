/******************************************************************************/
/**************************** ETHEREUM ***************************************/
/******************************************************************************/
import {call, put, takeEvery} from 'redux-saga/lib/effects.js'
// ========================================================
// Get Ethereum current block number
// ========================================================
let getBlockNumber = () => {
  return new Promise((resolve, reject) => {
    window.web3.eth.getBlockNumber((e, r) => !e ? resolve(r) : reject(e))
  })
}
function* fetchEthereumInfoWorker() {
  try {
    yield put({type: 'BLOCK_NUMBER_REQUESTED'})
    const blockNumber = yield call(getBlockNumber)
    yield put({type: 'BLOCK_NUMBER_SUCCEED', blockNumber})
  } catch (e) {
    yield put({type: 'BLOCK_NUMBER_FAILED', e: e.message})
  }
}
// ========================================================
// Watch Ethereum saga
// ========================================================
export function* watchGetBlockNumber() {
  yield takeEvery('FETCH_ETHEREUM_INFO_REQUESTED', fetchEthereumInfoWorker)
}