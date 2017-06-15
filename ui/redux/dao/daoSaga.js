import Dao1901Contracts from 'dao1901-contracts';
import {call, put, select, takeEvery} from 'redux-saga/effects'

// ------------------------------------
// Contracts management
// ------------------------------------
let setWeb3Provider = (contract) => {
  // Todo: warning web3 from window
  contract.setProvider(window.web3.currentProvider);
  return contract.deployed();
}
function* getDeployedContractsWorker() {
  try {
    const {Dao1901Members, Dao1901Votes, Owned} = Dao1901Contracts;
    const contracts = yield call(() => Promise.all([Dao1901Members, Dao1901Votes, Owned].map(setWeb3Provider)));
    yield put({type: 'FETCH_CONTRACTS_SUCCEED', contracts});
  } catch (e) {
    yield put({type: 'FETCH_CONTRACTS_FAILED', error: e.message});
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
        /*this.refs.toastContainer.success(
          `The member ${values.memberAddress} has been added successfully`, 'Membership management', {
            timeOut: 7000
          }
        );*/
        console.log(`New member ${values.memberAddress} added by ${web3.eth.defaultAccount}`)
        console.log(`Subscribe TxId: ${tx}`)
        resolve(tx)
    })
    .catch((err) => {
      /*this.refs.toastContainer.error(
        `The member ${values.memberAddress} has not been added. Please try later.`, 'Membership management', {
          timeOut: 7000
        }
      );*/
      console.log(`The account ${web3.eth.defaultAccount} has failed to add ${values.memberAddress}`)
      reject(err.message)
    });
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
/*
async revokeMember(values) {
  try {
    let tx = await Dao1901Members.subscribe
      .sendTransaction(values.memberAddress, 0, {gas: 70000});
    this.refs.toastContainer.success(
      `The member ${values.memberAddress} has been revoked successfully`, 'Membership management', {
        timeOut: 7000
      });
    console.log(`The account ${web3.eth.defaultAccount} have revoked the member ${values.memberAddress}`);
    console.log(`Subscribe TxId: ${tx}`);
    await this.generateMemberListUI();
  }
  catch (err) {
    this.refs.toastContainer.error(
      `The member ${values.memberAddress} has not been revoked. Please try later.`, 'Membership management', {
        timeOut: 7000
      }
    );
    console.log(`The account ${web3.eth.defaultAccount} have failed to revoke ${values.memberAddress}`);
    throw new Error(err.message);
  }
}
*/

/**
 * Create Member List
 * Browse the chained list
 * @param Dao1901Members
 * @returns {Promise}
 */
let generateMemberListAddrs = (Dao1901Members) => {
  return new Promise((resolve, reject) => {
    let membersInfo = []
    let endSubscriptionDate = ''
    let addr = '';

    // Get the head of the linked list - Either 0x0 or the last added
    Dao1901Members.head()
      .then((r) => {
        addr = r;
        let iterateOnSubscriptions = () => {
          // On metamask testnet: first head is '0x'
          // On on metamask with local Geth: '0x0000000000000000000000000000000000000000'
          if (addr != 0 && addr != '0x' && addr != '0x0') {
            Dao1901Members.isMember(addr)
              .then((isMember) => {
                if (isMember) {
                  Dao1901Members.subscriptions(addr)
                    .then((subscription) => {
                      endSubscriptionDate = subscription[0].toString();
                      membersInfo.push({memberAddress: addr, endSubscriptionDate});
                      // take the next element to follow the linked list
                      addr = subscription[1];
                      iterateOnSubscriptions();
                    })
                    .catch((e) => reject(e))
                }
              })
              .catch((errIsMember) => errIsMember && reject(errIsMember))
          } else {
            resolve(membersInfo)
          }
        };
        iterateOnSubscriptions()
      })
  })
}
function* generateMemberListAddrsWorker() {
  try {
    let Dao1901Members = yield select(s => s.dao.contract.Dao1901Members)
    const members = yield call(generateMemberListAddrs, Dao1901Members)
    yield put({type: 'FETCH_ALL_MEMBERS_SUCCEED', members});
  } catch (e) {
    yield put({type: 'FETCH_ALL_MEMBERS_FAILED', error: e});
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
/*
async changeOwner(values) {
  try {
    let res = await Owned.changeOwner.sendTransaction(values.changeOwnerInput, {from: this.state.owner, gas: 200000});
    // Set new Owner
    this.setState({owner: values.changeOwnerInput});
    this.refs.toastContainer.success(
      `The ownership has been transferred to ${values.changeOwnerInput}`, '', {
        timeOut: 7000
      }
    );
    console.log(`changeOwnerTx: ${res}`);
  }
  catch (err) {
    this.refs.toastContainer.error(
      "You don't have the rights to transfer ownership", '', {
        timeOut: 7000
      }
    );
    throw new Error(err.message);
  }
}
*/

// todo Change it to computed state - Reselect.js ?
function* fetchOwnerAddressWorker() {
  try {
    let Owned = yield select(s => s.dao.contract.Owned)
    let ownerAddress = yield Owned.owner()
    yield put({type: 'DAO_OWNER_ADDRESS_SUCCEED', ownerAddress})
  } catch (e) {
    yield put({type: 'DAO_OWNER_ADDRESS_FAILED', error: e})
  }
}

// ------------------------------------
// The DAO Watcher Saga
// ------------------------------------
export default function* dao() {
  yield takeEvery('FETCH_CONTRACTS_REQUESTED', getDeployedContractsWorker)
  yield takeEvery('DAO_OWNER_ADDRESS_REQUESTED', fetchOwnerAddressWorker)
  yield takeEvery('ADD_MEMBER_REQUESTED', addMemberWorker)
  yield takeEvery('FETCH_ALL_MEMBERS_REQUESTED', generateMemberListAddrsWorker)
}