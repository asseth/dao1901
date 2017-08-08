/**
 * Effects
 */
// call: block the saga until promise is resolved
// fork: run a task concurrently
// put: dispatch action to the store
// select: get state from redux store
// take: intercepts action dispatched to the store
// takeEvery: listen for dispatched actions and run them through the worker sagas
import {all, call, fork, put, race, take} from 'redux-saga/lib/effects.js'
import dao from './dao/daoSaga'
import {watchGetBlockNumber} from './ethereum/ethereumSaga'
import vote from './votes/votesSaga'
import user, {watchDefaultAccountChange} from './user/userSaga'

function* bootstrap() {
  console.log('bootstrap sagas')
  yield put({type: 'USER_ACCOUNTS_REQUESTED'})
  yield put({type: 'FETCH_ETHEREUM_INFO_REQUESTED'})
  yield put({type: 'FETCH_CONTRACTS_INFO_REQUESTED'})
  const { error } = yield race({
    success: take('FETCH_CONTRACTS_INFO_SUCCEED'),
    error: take('FETCH_CONTRACTS_INFO_FAILED'),
  })
  if (error) throw new Error(error)
  yield put({type: 'FETCH_OWNER_ADDRESS_REQUESTED'})
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
  yield all([
    fork(watchGetBlockNumber),
    fork(dao),
    fork(vote),
    fork(user),
    fork(bootstrap),
    call(watchDefaultAccountChange),
  ])
}