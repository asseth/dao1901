import {contracts} from '../../blockchainConnect'
import {call, put, select, takeEvery} from 'redux-saga/lib/effects.js'
import {toastr} from 'react-redux-toastr'
import waitForMined from '../../helpers/waitForMined'
// ------------------------------------
// Put useful contract info in store
// ------------------------------------
let fetchContractsInfo = () => {
  let contractsInfos = {}
  for (let key in contracts) {
    if(contracts.hasOwnProperty(key)) {
      contractsInfos = {...contractsInfos, [contracts[key].name]: {}}
      contractsInfos[ contracts[key].name ].address = contracts[key].address
    }
  }
  return contractsInfos
}
function* fetchContractsInfoWorker() {
  try {
    let contracts = yield call(fetchContractsInfo)
    yield put({type: 'CONTRACTS_INFO_SUCCEED', values: {contracts}})
  } catch (e) {
    yield put({type: 'CONTRACTS_INFO_FAILED', error: e})
  }
}
// ------------------------------------
// Add member
// ------------------------------------
function addMember(memberAddress, yearsDuration) {
  const {Dao1901Members} = contracts
  return Dao1901Members.subscribe
    .sendTransaction(memberAddress, yearsDuration, {from: window.web3.eth.defaultAccount, gas: 70000}) // gasUsed: 68866
}
function* addMemberWorker(action) {
  try {
    const {memberAddress, yearsDuration} = action.values
    const tx = yield call(addMember, memberAddress, yearsDuration)
    yield call(waitForMined, tx, 'addMember')
    let endSubscriptionDate = new Date().setFullYear(new Date().getFullYear() + Number(yearsDuration))
    endSubscriptionDate = String(endSubscriptionDate).substring(0,10)
    let _members = yield select(s => s.dao.members)
    const members = [..._members, {memberAddress, endSubscriptionDate}]
    yield put({type: 'TX_ADD_MEMBER_SUCCEED', tx, values: {members}})
  } catch (e) {
    yield put({type: 'TX_ADD_MEMBER_FAILED', e: e.message})
  }
}
// ------------------------------------
// Revoke member
// ------------------------------------
function revokeMember(values) {
  const {Dao1901Members} = contracts
  return Dao1901Members.subscribe
    .sendTransaction(values.memberAddress, -1, {from: window.web3.eth.defaultAccount, gas: 70000})
}
function* revokeMemberWorker(action) {
  try {
    const tx = yield call(revokeMember, action.values)
    yield call(waitForMined, tx, 'revokeMember')
    yield put({type: 'TX_REVOKE_MEMBER_SUCCEED', tx})
    yield put({type: 'ALL_MEMBERS_REQUESTED'})
  } catch (e) {
    yield put({type: 'TX_REVOKE_MEMBER_FAILED', e: e.message})
  }
}
// ------------------------------------
// Fetch members
// ------------------------------------
function* fetchAllMembers(_addr) {
  const {Dao1901Members} = contracts
  let members = []
  let endSubscriptionDate = ''
  let addr = _addr
  function* iter() {
    if (addr != 0 && addr != '0x' && addr != '0x0') {
      let isMember = yield call(Dao1901Members.isMember, addr)
      let subscription = yield call(Dao1901Members.subscriptions, addr)
      endSubscriptionDate = subscription[0].toString()
      isMember && members.push({memberAddress: addr, endSubscriptionDate})
      // take the next element to follow the linked list
      addr = subscription[1]
      yield call(iter, addr)
    }
  }
  yield call(iter, addr)
  return members.reverse()
}

function* fetchAllMembersWorker() {
  const {Dao1901Members} = contracts
  try {
    // Get the head of the linked list - Either 0x0 or the last added
    const head = yield call(Dao1901Members.head)
    const members = yield call(fetchAllMembers, head)
    yield put({type: 'ALL_MEMBERS_SUCCEED', values: {members}})
  } catch (e) {
    yield put({type: 'ALL_MEMBERS_FAILED', error: e})
  }
}
// ------------------------------------
// Check membership
// ------------------------------------
function* checkMembershipWorker(action) {
  const {Dao1901Members} = contracts
  try {
    const {memberAddressToCheck} = action.values
    let isMember = yield call(Dao1901Members.isMember, memberAddressToCheck)
    if (isMember) {
      toastr.success('Membership management', `${memberAddressToCheck} is a member`)
    } else {
      toastr.error('Membership management', `${memberAddressToCheck} is not a member`)
    }
    yield put({type: 'CHECK_MEMBERSHIP_SUCCEED', values: {isMember}})
  } catch (e) {
    yield put({type: 'CHECK_MEMBERSHIP_FAILED', error: e.message})
  }
}
// ------------------------------------
// Owner management
// ------------------------------------
function transferOwnership(ownerAddress, newOwnerAddress) {
  return new Promise((resolve, reject) => {
    const {Owned} = contracts
    const toastrConfirmOptions = {
      onOk: () => {
        resolve(Owned.changeOwner
          .sendTransaction(newOwnerAddress, {from: ownerAddress, gas: 200000})) // todo check gas
      },
      onCancel: () => console.log('Ownership transfer cancelled')
    }
    toastr.confirm(`Are you sure that you want to transfer ownership to ${newOwnerAddress}`, toastrConfirmOptions)
  })
}
function* transferOwnershipWorker(action) {
  try {
    let ownerAddress = yield select(s => s.dao.ownerAddress)
    const tx = yield call(transferOwnership, ownerAddress, action.values.newOwnerAddress)
    yield call(waitForMined, tx, 'transferOwnership')
    yield put({type: 'TX_TRANSFER_OWNERSHIP_SUCCEED', tx, values: {ownerAddress: action.values.newOwnerAddress}})
  } catch (e) {
    yield put({type: 'TX_TRANSFER_OWNERSHIP_FAILED', error: e})
  }
}
function* fetchOwnerAddressWorker() {
  try {
    const {Owned} = contracts
    let ownerAddress = yield call(Owned.owner)
    yield put({type: 'OWNER_ADDRESS_SUCCEED', values: {ownerAddress}})
  } catch (e) {
    yield put({type: 'OWNER_ADDRESS_FAILED', error: e})
  }
}
// ------------------------------------
// The DAO Watcher Saga
// ------------------------------------
export default function* dao() {
  yield takeEvery('ALL_MEMBERS_REQUESTED', fetchAllMembersWorker)
  yield takeEvery('CHECK_MEMBERSHIP_REQUESTED', checkMembershipWorker)
  yield takeEvery('CONTRACTS_INFO_REQUESTED', fetchContractsInfoWorker)
  yield takeEvery('OWNER_ADDRESS_REQUESTED', fetchOwnerAddressWorker)
  yield takeEvery('TX_ADD_MEMBER_REQUESTED', addMemberWorker)
  yield takeEvery('TX_REVOKE_MEMBER_REQUESTED', revokeMemberWorker)
  yield takeEvery('TX_TRANSFER_OWNERSHIP_REQUESTED', transferOwnershipWorker)
}