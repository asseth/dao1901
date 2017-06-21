import {
  fetchAllVotesForAllProposalsWorker
} from '../votesSaga'
import { put, select, take } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

let fakeStore = {
  dao: {
   contracts: {
     Dao1901Votes: {'toto': '111'}
   }
  }
}

test('two plus two is four', () => {
  const gen = fetchAllVotesForAllProposalsWorker()
  const selectAction = gen.next().value
  //console.log('selectAction', selectAction)
  //console.log('select(selectors.contractDao1901Votes)', select(selectors.contractDao1901Votes))
  //expect(selectAction).toEqual(select(selectors.contractDao1901Votes))
})