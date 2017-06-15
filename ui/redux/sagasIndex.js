/**
 * Effects
 */
// call: block the saga until promise is resolved
// fork: run a task concurrently
// put: dispatch action to the store
// select: get state from redux store
// take: intercepts action dispatched to the store
// takeEvery: listen for dispatched actions and run them through the worker sagas
import {call, fork, put, race, select, take, takeEvery} from 'redux-saga/effects'
import dao from './dao/daoSaga'
import {watchGetBlockNumber} from './ethereum/ethereumSaga'
import vote from './votes/votesSaga'
import user from './user/userSaga'

/***************************** App State **************************************
- ethereum - Technical info about the Ethereum blockchain
 - blockNumber
 - numberOfPeers

- dao - Useful info for dao admin
 - ownerAddress
 - contract
   - owned
    - address
   - members
    - address
   - votes
    - address
 - members[]
  - member
    - address
    - endSubscriptionDate

- user
  - address
  - balance
 
- votes
  - proposals[]
    - proposal
      - id
      - isPassed
      - description
*/

function* bootstrap() {
  console.log('bootstrap ')
  yield put({type: 'USER_ACCOUNTS_REQUESTED'})
  yield put({type: 'BLOCK_NUMBER_REQUESTED'})
  yield put({type: 'FETCH_CONTRACTS_REQUESTED'})
  const { error } = yield race({
    success: take('FETCH_CONTRACTS_SUCCEED'),
    error: take('FETCH_CONTRACTS_FAILED'),
  })
  if (error) throw new Error(error)
  yield put({type: 'DAO_OWNER_ADDRESS_REQUESTED'})
  yield bootstrapProposalSubmissionPage()
  yield bootstrapVotingPage()
  yield bootstrapAdminPage()
}

function* bootstrapProposalSubmissionPage() {
  yield put({type: 'FETCH_ALL_PROPOSALS_REQUESTED'})
}

function* bootstrapVotingPage() {
  yield put({type: 'FETCH_ALL_VOTES_FOR_ALL_PROPOSALS_REQUESTED'})
}

function* bootstrapAdminPage() {
  yield put({type: 'FETCH_ALL_MEMBERS_REQUESTED'})
}

/******************************************************************************/
/******************************* ROOT SAGA ************************************/
/******************************************************************************/
export default function* rootSaga() {
  yield [
    fork(watchGetBlockNumber),
    fork(dao),
    fork(vote),
    fork(user),
    fork(bootstrap),
  ]
}