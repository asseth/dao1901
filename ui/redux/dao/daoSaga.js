import {contracts} from '../createStore'
import {call, put, select, takeEvery} from 'redux-saga/effects'
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
    let contractsInfo = yield call(fetchContractsInfo)
    yield put({type: 'FETCH_CONTRACTS_INFO_SUCCEED', contractsInfo})
  } catch (e) {
    yield put({type: 'FETCH_CONTRACTS_INFO_FAILED', error: e})
  }
}

let addMember = (values) => {
  const {Dao1901Members} = contracts
  return Dao1901Members.subscribe
    .sendTransaction(values.memberAddress, values.yearsDuration, {from: web3.eth.defaultAccount, gas: 70000}) // gasUsed: 68866
}

function* addMemberWorker(action) {
  try {
    const tx = yield call(addMember, action.values)
    yield call(waitForMined, tx, 'addMember') // setInterval until mined
    yield put({type: 'ADD_MEMBER_SUCCEED', tx})
    yield put({type: 'FETCH_ALL_MEMBERS_REQUESTED'})
  } catch (e) {
    yield put({type: 'ADD_MEMBER_FAILED', error: e})
  }
}
/**
 * Revoke a member by updating his subscription to zero
 * The address member is preserved on the linked list on Ethereum
 * @param values
 */
let revokeMember = (values) => {
  return new Promise((resolve, reject) => {
    const {Dao1901Members} = contracts
    Dao1901Members.subscribe
      .sendTransaction(values.memberAddress, 0, {gas: 70000})
      .then((tx) => {
        toastr.success('Membership management', `The member ${values.memberAddress} has been revoked successfully`)
        console.log(`The account ${window.web3.eth.defaultAccount} have revoked the member ${values.memberAddress}`)
        resolve(tx)
      })
      .catch((e) => {
        toastr.error('Membership management', `The member ${values.memberAddress} has not been revoked. Please try later`)
        console.log(`The account ${window.web3.eth.defaultAccount} have failed to revoke ${values.memberAddress}`)
        reject(e)
      })
  })
}
function* revokeMemberWorker(action) {
  try {
    const tx = yield call(revokeMember, action.values)
    yield call(waitForMined, tx, 'revokeMember') // setInterval until mined
    yield put({type: 'REVOKE_MEMBER_SUCCEED', tx})
    yield put({type: 'FETCH_ALL_MEMBERS_REQUESTED'})
  } catch (e) {
    yield put({type: 'REVOKE_MEMBER_FAILED', e})
  }
}
/**
 * Create Member List
 * Browse the chained list
 * @returns {Promise}
 */
let fetchAllMembers = () => {
  return new Promise((resolve, reject) => {
    const {Dao1901Members} = contracts
    let membersInfo = []
    let endSubscriptionDate = ''
    let addr = ''
    // Get the head of the linked list - Either 0x0 or the last added
    Dao1901Members.head()
      .then((r) => {
        addr = r
        let iterateOnSubscriptions = () => {
          // On metamask testnet: first head is '0x'
          // On on metamask with local Geth: '0x0000000000000000000000000000000000000000'
          if (addr != 0 && addr != '0x' && addr != '0x0') {
            Dao1901Members.isMember(addr)
              .then((isMember) => {
                Dao1901Members.subscriptions(addr)
                  .then((subscription) => {
                    endSubscriptionDate = subscription[0].toString()
                    isMember && membersInfo.push({memberAddress: addr, endSubscriptionDate})
                    // take the next element to follow the linked list
                    addr = subscription[1]
                    iterateOnSubscriptions()
                  })
                  .catch((e) => reject(e))
              })
              .catch((errIsMember) => errIsMember && reject(errIsMember))
          } else {
            resolve(membersInfo)
          }
        }
        iterateOnSubscriptions()
      })
  })
}
function* fetchAllMembersWorker() {
  try {
    const members = yield call(fetchAllMembers)
    yield put({type: 'FETCH_ALL_MEMBERS_SUCCEED', members})
  } catch (e) {
    yield put({type: 'FETCH_ALL_MEMBERS_FAILED', error: e})
  }
}

let checkMembership = (memberAddressToCheck) => {
  const {Dao1901Members} = contracts
  return Dao1901Members.isMember(memberAddressToCheck)
}

export function* checkMembershipWorker(action) {
  try {
    const {memberAddressToCheck} = action.values
    let isMember = yield call(checkMembership, memberAddressToCheck)
    if (isMember) {
      toastr.success('Membership management', `${memberAddressToCheck} is a member`)
    } else {
      toastr.error('Membership management', `${memberAddressToCheck} is not a member`)
    }
    yield put({type: 'CHECK_MEMBERSHIP_SUCCEED', isMember})
  } catch (e) {
    yield put({type: 'CHECK_MEMBERSHIP_FAILED', error: e.message})
  }
}
// ------------------------------------
// Owner management
// ------------------------------------
/**
 * Transfer ownership
 * @param ownerAddress
 * @param newOwnerAddress
 * @returns {Promise}
 */
let transferOwnership = (ownerAddress, newOwnerAddress) => {
  return new Promise((resolve, reject) => {
    const {Owned} = contracts
    const toastrConfirmOptions = {
      onOk: () => {
        Owned.changeOwner
          .sendTransaction(newOwnerAddress, {from: ownerAddress, gas: 200000}) // todo check gas
          .then((tx) => {
            toastr.success('Organization management', `The ownership has been transferred to ${newOwnerAddress}`)
            resolve(tx)
          })
          .catch((e) => {
            toastr.error('Organization management', "You don't have the rights to transfer ownership")
            reject(e)
          })
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
    yield call(waitForMined, tx, 'transferOwnership') // setInterval until mined
    yield put({type: 'TRANSFER_OWNERSHIP_SUCCEED', ownerAddress: action.values.newOwnerAddress})
  } catch (e) {
    yield put({type: 'TRANSFER_OWNERSHIP_FAILED', error: e})
  }
}
/**
 * Fetch owner address worker
 */
function* fetchOwnerAddressWorker() {
  try {
    const {Owned} = contracts
    let ownerAddress = yield call(Owned.owner)
    yield put({type: 'FETCH_OWNER_ADDRESS_SUCCEED', ownerAddress})
  } catch (e) {
    yield put({type: 'FETCH_OWNER_ADDRESS_FAILED', error: e})
  }
}
// ------------------------------------
// The DAO Watcher Saga
// ------------------------------------
export default function* dao() {
  yield takeEvery('FETCH_CONTRACTS_INFO_REQUESTED', fetchContractsInfoWorker)
  yield takeEvery('FETCH_OWNER_ADDRESS_REQUESTED', fetchOwnerAddressWorker)
  yield takeEvery('ADD_MEMBER_REQUESTED', addMemberWorker)
  yield takeEvery('REVOKE_MEMBER_REQUESTED', revokeMemberWorker)
  yield takeEvery('CHECK_MEMBERSHIP_REQUESTED', checkMembershipWorker)
  yield takeEvery('FETCH_ALL_MEMBERS_REQUESTED', fetchAllMembersWorker)
  yield takeEvery('TRANSFER_OWNERSHIP_REQUESTED', transferOwnershipWorker)
}