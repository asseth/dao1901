/******************************************************************************/
/**************************** ETHEREUM ***************************************/
/******************************************************************************/
import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects'
import {ethereumCurrentBlockNumber} from '../ethereum/ethereumAction'

/******************************************************************************/
/******************************* WORKERS SAGAS - Subroutines ******************/
/******************************************************************************/
// worker Saga: will be fired on REQUEST actions

// ========================================================
// Get ethereum Current block number
// ========================================================
let getEthereumCurrentBlockNumber = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((e, r) => !e ? resolve(r) : reject(e.message))
  })
}

function* getEthereumCurrentBlockNumberWorker() {
  try {
    const blockNumber = yield call(getEthereumCurrentBlockNumber)
    yield put({type: 'BLOCK_NUMBER_SUCCEED', blockNumber})
  } catch (e) {
    yield put(ethereumCurrentBlockNumber.failure(e.message));
  }
}

/******************************************************************************/
/**************************** WATCHERS SAGAS **********************************/
/******************************************************************************/
export default function* watchGetEthereumCurrentBlockNumber() {
  yield takeEvery('BLOCK_NUMBER_REQUESTED', getEthereumCurrentBlockNumberWorker);
}

