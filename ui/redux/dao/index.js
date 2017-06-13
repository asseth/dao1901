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
    yield put({type: 'CONTRACTS_SUCCEED', contracts});
  } catch (e) {
    yield put({type: 'CONTRACTS_FAILED', error: e.message});
  }
}

export function* watchContracts() {
  yield takeEvery('CONTRACTS_REQUESTED', getDeployedContractsWorker)
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['DAO_OWNER_ADDRESS_SUCCEED']: (state, action) => {
    return {...state, ownerAddress: action.ownerAddress}
  },
  ['CONTRACTS_SUCCEED']: (state, action) => {
    let formSubState = (contract, i) => {
      let name = action.contracts[i].constructor.contract_name;
      // Put all in the store, todo ?
      return {[name]: contract}
    }
    let subStates = action.contracts.map(formSubState);
    return {...state, contract: Object.assign(...subStates)};
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function daoReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}