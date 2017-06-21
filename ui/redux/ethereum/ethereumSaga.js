/******************************************************************************/
/**************************** ETHEREUM ***************************************/
/******************************************************************************/
import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects'

// ========================================================
// Get Ethereum current block number
// ========================================================
let getBlockNumber = () => {
  return new Promise((resolve, reject) => {
    window.web3.eth.getBlockNumber((e, r) => !e ? resolve(r) : reject(e.message))
  })
}
function* getBlockNumberWorker() {
  try {
    const blockNumber = yield call(getBlockNumber)
    yield put({type: 'BLOCK_NUMBER_SUCCEED', blockNumber})
  } catch (e) {
    yield put({type: 'BLOCK_NUMBER_FAILED', ...e.message})
  }
}

/******************************************************************************/
/**************************** WATCHERS SAGAS **********************************/
/******************************************************************************/
export function* watchGetBlockNumber() {
  yield takeEvery('BLOCK_NUMBER_REQUESTED', getBlockNumberWorker);
}

