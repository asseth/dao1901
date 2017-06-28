// ========================================================
// Votes Sagas
// ========================================================
import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects'
import {toastr} from 'react-redux-toastr'
import waitForMined from '../../helpers/waitForMined'
import {contracts} from '../createStore'
// ========================================================
// Vote submission
// ========================================================
let onVoteSubmit = (proposalId, voteValue) => {
  return new Promise((resolve, reject) => {
    const {Dao1901Votes} = contracts
    Dao1901Votes.vote.sendTransaction(proposalId, voteValue)
      .then(tx => {
        console.log(`Vote tx hash: ${tx}`)
        toastr.success('Voting', `Your vote has been successfully submitted. Transaction ID: ${tx}`)
        resolve(tx)
      })
      .catch(e => {
        toastr.error('Error', `An error occurred. Please try later or contact the support. ` +
          `Hint: Check that the proposal id is valid and that you are registered as member`)
        reject(e)
      })
  })
}
function* onVoteSubmitWorker(action) {
  try {
    const { proposalId, voteValue } = action.values
    const tx = yield call(onVoteSubmit, proposalId, voteValue)
    yield call(waitForMined, tx, 'onVoteSubmit') // setInterval until mined
    yield put({type: 'VOTE_SUBMISSION_SUCCEED', tx})
    yield put({type: 'FETCH_ALL_VOTES_FOR_ALL_PROPOSALS_REQUESTED'})
  } catch (e) {
    yield put({type: 'VOTE_SUBMISSION_SUCCEED', error: e})
  }
}

/**
 * fetchProposalByIndex
 * @param Dao1901Votes
 * @param proposalId
 * @returns {*|Promise.<T>}
 */
let fetchProposalByIndex = (proposalId) => {
  return new Promise((resolve, reject) => {
    const {Dao1901Votes} = contracts
    Dao1901Votes.proposals(proposalId)
      .then((proposal) => {
        resolve({
          proposalDesc: proposal[0],
          proposalDeadline: proposal[1].toNumber(),
          voterHead: proposal[2]
        })
      })
      .catch((e) => {
        toastr.error('Error', `An error occurred. Please try later or contact the support`)
        reject(e)
      })
  })
}

/**
 * getTotalProposals
 */
let getTotalProposals = () => {
  const {Dao1901Votes} = contracts
  Dao1901Votes.nProposals().then(n => n.valueOf())
}

/**
 * fetchAllVotesForAProposal
 * @param proposalId
 * @returns {Promise}
 */
let fetchAllVotesForAProposal = (proposalId) => {
  return new Promise((resolve, reject) => {
    const {Dao1901Votes} = contracts
    let votes = []
    let addr = 0
    let generateVoteList = (proposalId, addr) => {
      if (addr != 0) {
        Dao1901Votes.getVote(proposalId, addr)
          .then((vote) => {
            votes.push({voterAddr: addr, proposalId: proposalId, voteValue: vote[0]})
            addr = vote[1]
            generateVoteList(proposalId, addr)
          })
          .catch((e) => reject(e))
      } else {
        resolve(votes)
      }
    }
    fetchProposalByIndex(proposalId)
      .then(({voterHead}) => {
        addr = voterHead
        generateVoteList(proposalId, addr)
    })
      .catch((e) => reject(e))
  })
}

/**
 * fetchAllVotesForAllProposals
 * @returns {Promise}
 */
export let fetchAllVotesForAllProposals = () => {
  return new Promise((resolve, reject) => {
    let allVotes = {}
    const {Dao1901Votes} = contracts
    Dao1901Votes.nProposals()
      .then(totalProposals => {
        let i = 1
        while (i <= totalProposals.valueOf()) {
          fetchAllVotesForAProposal(i)
            .then((votesForOneProposal) => {
              if (votesForOneProposal.length !== 0) {
                allVotes[votesForOneProposal[0].proposalId] = votesForOneProposal
              }
            })
            .catch((e) => reject(e))
          i++
        }
        resolve(allVotes)
      })
      .catch((e) => reject(e))
  })
}
export function* fetchAllVotesForAllProposalsWorker() {
  try {
    const votes = yield call(fetchAllVotesForAllProposals)
    yield put({type: 'FETCH_ALL_VOTES_FOR_ALL_PROPOSALS_SUCCEED', votes: votes})
  } catch (e) {
    yield put({type: 'FETCH_ALL_VOTES_FOR_ALL_PROPOSAL_FAILED', error: e})
  }
}

/**
 * fetchAllProposals
 * @returns {Promise}
 */
let fetchAllProposals = () => {
  return new Promise((resolve, reject) => {
    let proposalListItems = []
    const {Dao1901Votes} = contracts
    Dao1901Votes.nProposals()
      .then(totalProposals => {
        let proposalId = 1 // there is no proposal index 0
        let getAllProposalListItems = (proposalId) => {
          if (proposalId <= totalProposals.valueOf()) {
            fetchProposalByIndex(proposalId)
              .then(({proposalDesc, proposalDeadline}) => {
                proposalListItems.push({proposalId, proposalDesc, proposalDeadline})
                proposalId += 1
                getAllProposalListItems(proposalId)
              })
              .catch((e) => reject(e))
          } else {
            resolve(proposalListItems)
          }
        }
        getAllProposalListItems(proposalId)
      })
  })
}
function* fetchAllProposalsWorker() {
  try {
    const proposals = yield call(fetchAllProposals)
    yield put({type: 'FETCH_ALL_PROPOSALS_SUCCEED', proposals})
  } catch (e) {
    yield put({type: 'FETCH_ALL_PROPOSALS_FAILED', error: e})
  }
}

/**
 * Create Proposal
 * @param proposalDesc
 * @param proposalDeadline
 * @returns {Promise}
 */
let createProposal = (proposalDesc, proposalDeadline) => {
  return new Promise((resolve, reject) => {
    const {Dao1901Votes} = contracts
    Dao1901Votes.createProposal.sendTransaction(proposalDesc, proposalDeadline, {from: window.web3.eth.defaultAccount}) // todo: from is necessary for Metamask ?!
      .then((tx) => {
        console.log('TX createProposal successful. Tx Hash: ', tx)
        toastr.success('Proposal submission', `Your proposal has been successfully submitted. Transaction ID: ${tx}`)
        resolve(tx)
      })
      .catch((e) => {
        if (e.message === 'invalid address') {
          toastr.error('Error', `Invalid address. Check your permissions`)
        } else {
          toastr.error('Error', `An error occurred. Please try later or contact the support`)
        }
        reject(e.message)
      })
  })
}

function* createProposalWorker({values}) {
  try {
    const {proposalDescription, proposalDeadline} = values
    const tx = yield call(createProposal, proposalDescription, proposalDeadline)
    yield call(waitForMined, tx, 'create proposal') // setInterval until mined
    yield put({type: 'CREATE_PROPOSAL_SUCCEED'})
    yield put({type: 'FETCH_ALL_PROPOSALS_REQUESTED'})
  } catch (e) {
    yield put({type: 'CREATE_PROPOSAL_FAILED', e})
  }
}

export default function* vote() {
  yield takeEvery('CREATE_PROPOSAL_REQUESTED', createProposalWorker)
  yield takeEvery('VOTE_SUBMISSION_REQUESTED', onVoteSubmitWorker)
  yield takeEvery('FETCH_ALL_PROPOSALS_REQUESTED', fetchAllProposalsWorker)
  yield takeEvery('FETCH_ALL_VOTES_FOR_ALL_PROPOSALS_REQUESTED', fetchAllVotesForAllProposalsWorker)
}


