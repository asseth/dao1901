import Dao1901Contracts from 'dao1901-contracts';
import {call, put, select, takeEvery} from 'redux-saga/effects'

/*
- dao // from blockchain - Useful info for dao admin
 - ownerAddress
 - contract
   - owned
    - address
   - members
    - address
   - votes
    - address
*/
// ------------------------------------
// Sagas
// ------------------------------------
let fetchOwnerAddress = async () => {
  let Owned = await contracts.Owned.deployed();
  console.log('Owned', Owned)
}

function* fetchOwnerAddressWorker() {
  try {
    let Owned = yield select(s => s.dao.contract.Owned)
    let ownerAddress = yield Owned.owner()
    yield put({type: 'DAO_OWNER_ADDRESS_SUCCEED', ownerAddress})
  } catch (e) {
    yield put({type: 'DAO_OWNER_ADDRESS_FAILED', error: e})
  }
}

export function* watchFetchOwnerAddress() {
  yield takeEvery('DAO_OWNER_ADDRESS_REQUESTED', fetchOwnerAddressWorker)
}

let getDeployedContract = (contract) => {
  // Todo: warning web3 from window
  contract.setProvider(window.web3.currentProvider);
  return contract.deployed();
}

function* getDeployedContractsWorker() {
  try {
    const {Dao1901Members, Dao1901Votes, Owned} = Dao1901Contracts;
    const contracts = yield call(() => Promise.all([Dao1901Members, Dao1901Votes, Owned].map(getDeployedContract)));
    yield put({type: 'FETCH_CONTRACTS_SUCCEED', contracts});
  } catch (e) {
    yield put({type: 'FETCH_CONTRACTS_FAILED', error: e.message});
  }
}

export function* watchContracts() {
  yield takeEvery('FETCH_CONTRACTS_REQUESTED', getDeployedContractsWorker)
}

