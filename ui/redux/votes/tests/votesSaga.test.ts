import {
  fetchAllVotesForAllProposals,
  fetchAllVotesForAllProposalsWorker
} from '../votesSaga'
import { call, put, select, take } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

let fakeStore = {
  dao: {
   contracts: {
     Dao1901Votes: {'toto': '111'}
   }
  }
}

test('fetch all votes for all proposals', () => {
  const gen = fetchAllVotesForAllProposalsWorker()
  const callAction = gen.next().value
  expect(callAction).toEqual(call(fetchAllVotesForAllProposals))
  const putAction = gen.next({vote: 2}).value
  expect(putAction).toEqual(put({type: 'FETCH_ALL_VOTES_FOR_ALL_PROPOSALS_SUCCEED', votes: {vote: 2}}))
  const done = gen.next().done
  expect(done).toBeTruthy()
})