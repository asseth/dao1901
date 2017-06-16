import Dao1901Contracts from 'dao1901-contracts'
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {toastr} from 'react-redux-toastr'
// ------------------------------------
// Contracts management
// ------------------------------------
let setWeb3Provider = (contract) => {
  // Todo: warning web3 from window
  contract.setProvider(window.web3.currentProvider)
  return contract.deployed()
}
function* getDeployedContractsWorker() {
  try {
    const {Dao1901Members, Dao1901Votes, Owned} = Dao1901Contracts
    const contracts = yield call(() => Promise.all([Dao1901Members, Dao1901Votes, Owned].map(setWeb3Provider)))
    yield put({type: 'FETCH_CONTRACTS_SUCCEED', contracts})
  } catch (e) {
    yield put({type: 'FETCH_CONTRACTS_FAILED', error: e.message})
  }
}
// ------------------------------------
// Members management
// ------------------------------------
/**
 * Add a member to the organization
 * @param values
 */
let addMember = (Dao1901Members, values) => {
  return new Promise((resolve, reject) => {
    Dao1901Members.subscribe
      .sendTransaction(values.memberAddress, values.yearsDuration, {gas: 70000}) // todo check gas amount
      .then((tx) => {
        toastr.success('Membership management', `The member ${values.memberAddress} has been added successfully`)
        console.log(`New member ${values.memberAddress} added by ${web3.eth.defaultAccount}`)
        console.log(`Subscribe TxId: ${tx}`)
        resolve(tx)
      })
      .catch((e) => {
        toastr.error('Membership management', `The member ${values.memberAddress} has not been added. Please try later`)
        console.log(`The account ${web3.eth.defaultAccount} has failed to add ${values.memberAddress}`)
        reject(e)
      })
  })
}
function* addMemberWorker(action) {
  try {
    let Dao1901Members = yield select(s => s.dao.contract.Dao1901Members)
    const member = yield call(addMember, Dao1901Members, action.values)
    yield put({type: 'ADD_MEMBER_SUCCEED', member})
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

let revokeMember = (Dao1901Members, values) => {
  return new Promise((resolve, reject) => {
    Dao1901Members.subscribe
      .sendTransaction(values.memberAddress, 0, {gas: 70000})
      .then((tx) => {
        toastr.success('Membership management', `The member ${values.memberAddress} has been revoked successfully`)
        console.log(`The account ${web3.eth.defaultAccount} have revoked the member ${values.memberAddress}`)
        console.log(`Revokation TxId: ${tx}`)
        resolve(tx)
      })
      .catch((e) => {
        toastr.error('Membership management', `The member ${values.memberAddress} has not been revoked. Please try later`)
        console.log(`The account ${web3.eth.defaultAccount} have failed to revoke ${values.memberAddress}`)
        reject(e)
      })
  })
}
function* revokeMemberWorker(action) {
  try {
    let Dao1901Members = yield select(s => s.dao.contract.Dao1901Members)
    yield call(revokeMember, Dao1901Members, action.values)
    yield put({type: 'REVOKE_MEMBER_SUCCEED'})
    yield put({type: 'FETCH_ALL_MEMBERS_REQUESTED'})
  } catch (e) {
    yield put({type: 'REVOKE_MEMBER_FAILED', e})
  }
}
/**
 * Create Member List
 * Browse the chained list
 * @param Dao1901Members
 * @returns {Promise}
 */
let fetchAllMembers = (Dao1901Members) => {
  return new Promise((resolve, reject) => {
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
    let Dao1901Members = yield select(s => s.dao.contract.Dao1901Members)
    const members = yield call(fetchAllMembers, Dao1901Members)
    yield put({type: 'FETCH_ALL_MEMBERS_SUCCEED', members})
  } catch (e) {
    yield put({type: 'FETCH_ALL_MEMBERS_FAILED', error: e})
  }
}
/**
 * Check Membership
 * Call fn that returns a boolean
 */
let checkMembership = (Dao1901Members, memberAddressToCheck) => {
  return new Promise((resolve, reject) => {
    Dao1901Members.isMember(memberAddressToCheck)
      .then((isMember) => {
        if (isMember) {
          console.log(`${memberAddressToCheck} is a member.`)
          toastr.success('Membership management', `${memberAddressToCheck} is a member`)
        } else {
          console.log(`${memberAddressToCheck} is not a member.`)
          toastr.error('Membership management', `${memberAddressToCheck} is not a member`)
        }
        resolve(isMember)
      })
      .catch((e) => {
        toastr.error('Membership management', `We can't check membership for now. Please try later`)
        reject(e)
      })
  })
}
export function* checkMembershipWorker(action) {
  try {
    const {memberAddressToCheck} = action.values
    let Dao1901Members = yield select(s => s.dao.contract.Dao1901Members)
    let bool = yield call(checkMembership, Dao1901Members, memberAddressToCheck)
    yield put({type: 'CHECK_MEMBERSHIP_SUCCEED', isMember: bool})
  } catch (e) {
    yield put({type: 'CHECK_MEMBERSHIP_FAILED', error: e})
  }
}
// ------------------------------------
// Owner management
// ------------------------------------
/**
 * Transfer ownership
 * @param values
 * @returns {Promise.<void>}
 */
let transferOwnership = (Owned, ownerAddress, newOwnerAddress) => {
  return new Promise((resolve, reject) => {
    Owned.changeOwner
      .sendTransaction(newOwnerAddress, {from: ownerAddress, gas: 200000}) // todo check gas
      .then((tx) => {
        const toastrConfirmOptions = {
          onOk: () => {
            toastr.success('Organization management', `The ownership has been transferred to ${newOwnerAddress}`)
            console.log(`Change Owner Tx: ${tx}`)
            resolve(tx)
          },
          onCancel: () => console.log('Ownership transfer cancelled')
        };
        toastr.confirm(`Are you sure that you want to transfer ownership to ${newOwnerAddress}`, toastrConfirmOptions);
      })
      .catch((e) => {
        toastr.error('Organization management', "You don't have the rights to transfer ownership")
        reject(e)
      })
  })
}
function* transferOwnershipWorker(action) {
  try {
    let dao = yield select(s => s.dao)
    yield call(transferOwnership, dao.contract.Owned, dao.ownerAddress, action.values.newOwnerAddress)
    yield put({type: 'TRANSFER_OWNERSHIP_SUCCEED', ownerAddress: action.values.newOwnerAddress})
  } catch (e) {
    yield put({type: 'TRANSFER_OWNERSHIP_FAILED', error: e})
  }
}
// todo Change it to computed state - Reselect.js ?
function* fetchOwnerAddressWorker() {
  try {
    let Owned = yield select(s => s.dao.contract.Owned)
    let ownerAddress = yield Owned.owner()
    yield put({type: 'FETCH_OWNER_ADDRESS_SUCCEED', ownerAddress})
  } catch (e) {
    yield put({type: 'FETCH_OWNER_ADDRESS_FAILED', error: e})
  }
}
// ------------------------------------
// The DAO Watcher Saga
// ------------------------------------
export default function* dao() {
  yield takeEvery('FETCH_CONTRACTS_REQUESTED', getDeployedContractsWorker)
  yield takeEvery('FETCH_OWNER_ADDRESS_REQUESTED', fetchOwnerAddressWorker)
  yield takeEvery('ADD_MEMBER_REQUESTED', addMemberWorker)
  yield takeEvery('REVOKE_MEMBER_REQUESTED', revokeMemberWorker)
  yield takeEvery('CHECK_MEMBERSHIP_REQUESTED', checkMembershipWorker)
  yield takeEvery('FETCH_ALL_MEMBERS_REQUESTED', fetchAllMembersWorker)
  yield takeEvery('TRANSFER_OWNERSHIP_REQUESTED', transferOwnershipWorker)
}