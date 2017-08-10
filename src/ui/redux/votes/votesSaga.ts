// ========================================================
// Votes Sagas
// ========================================================
import {call, put, takeEvery} from 'redux-saga/lib/effects.js'
import waitForMined from '../../helpers/waitForMined'
import {contracts} from '../../blockchainConnect'

// ========================================================
// Vote submission
// ========================================================
let onVoteSubmit = (proposalId, voteValue) => {
  const {Dao1901Votes}: any = contracts
  return Dao1901Votes.vote.sendTransaction(proposalId, voteValue, {from: window.web3.eth.defaultAccount, gas: 100000})
}
function* onVoteSubmitWorker(action) {
  try {
    const {proposalId, voteValue} = action.values
    const tx = yield call(onVoteSubmit, proposalId, voteValue)
    yield call(waitForMined, tx, 'onVoteSubmit') // setInterval until mined
    yield put({type: 'VOTE_SUBMISSION_SUCCEED', tx})
    yield put({type: 'FETCH_ALL_VOTES_FOR_ALL_PROPOSALS_REQUESTED'})
  } catch (e) {
    yield put({type: 'VOTE_SUBMISSION_FAILED', e: e.message})
  }
}
// ========================================================
// Fetch votes
// ========================================================
function getVote(proposalId, addr) {
  const {Dao1901Votes}: any = contracts
  return Dao1901Votes.getVote(proposalId, addr)
}
function* generateVoteListByProposal(proposalId, _addr) {
  let votes = []
  let addr = _addr // head at first call, then next
  function* iter(addr) {
    if (addr != 0) {
      const vote = yield call(getVote, proposalId, addr)
      votes.push({voterAddr: addr, proposalId: proposalId, voteValue: vote[0]})
      addr = vote[1] // next voter
      yield call(iter, addr)
    }
  }
  yield call(iter, addr)
  return votes
}
function* fetchVotesForAProposal(proposalId) {
  const proposal = yield call(fetchProposalById, proposalId)
  let addr = proposal[2] // voter head of linked list
  const votesForAProp = yield call(generateVoteListByProposal, proposalId, addr)
  return votesForAProp
}
export function* fetchAllVotesForAllProposalsWorker() {
  try {
    let votes = {}
    let proposalId = 1
    const totalProposals = yield call(getTotalProposals)
    while (proposalId <= totalProposals.valueOf()) {
      let votesProp = yield call(fetchVotesForAProposal, proposalId)
      votes[proposalId] = votesProp
      proposalId++
    }
    yield put({type: 'FETCH_ALL_VOTES_FOR_ALL_PROPOSALS_SUCCEED', votes: votes})
  } catch (e) {
    yield put({type: 'FETCH_ALL_VOTES_FOR_ALL_PROPOSAL_FAILED', e: e.message})
  }
}
// ========================================================
// Proposal Creation
// ========================================================
function createProposal(proposalDesc, proposalDeadline) {
  const {Dao1901Votes} = contracts
  return Dao1901Votes.createProposal.sendTransaction(proposalDesc, proposalDeadline, {
    from: window.web3.eth.defaultAccount,
    gas: 600000
  }) //600000 gas == around 600 chars
}
function* createProposalWorker({values}) {
  try {
    const {proposalDescription, proposalDeadline} = values
    const tx = yield call(createProposal, proposalDescription, proposalDeadline)
    yield call(waitForMined, tx, 'create proposal') // setInterval until mined
    yield put({type: 'CREATE_PROPOSAL_SUCCEED', tx})
    yield put({type: 'FETCH_ALL_PROPOSALS_REQUESTED'})
  } catch (e) {
    yield put({type: 'CREATE_PROPOSAL_FAILED', e: e.message})
  }
}
// ========================================================
// Fetch proposals
// ========================================================
function fetchProposalById(proposalId) {
  const {Dao1901Votes} = contracts
  return Dao1901Votes.proposals(proposalId)
}
function getTotalProposals() {
  const {Dao1901Votes} = contracts
  return Dao1901Votes.nProposals()
}
function* generateProposalList(totalProposals) {
  let proposals = []
  let proposalId = 1
  while (proposalId <= totalProposals) {
    const proposal = yield call(fetchProposalById, proposalId)
    proposals.push({proposalId, proposalDesc: proposal[0], proposalDeadline: proposal[1]})
    proposalId++
  }
  return proposals
}
function* fetchAllProposalsWorker() {
  try {
    const totalProposals = yield call(getTotalProposals)
    let proposals = yield call(generateProposalList, totalProposals.valueOf())
    yield put({type: 'FETCH_ALL_PROPOSALS_SUCCEED', proposals})
  } catch (e) {
    yield put({type: 'FETCH_ALL_PROPOSALS_FAILED', e: e.message})
  }
}
// ========================================================
// Watch vote saga
// ========================================================
export default function* vote() {
  yield takeEvery('CREATE_PROPOSAL_REQUESTED', createProposalWorker)
  yield takeEvery('VOTE_SUBMISSION_REQUESTED', onVoteSubmitWorker)
  yield takeEvery('FETCH_ALL_PROPOSALS_REQUESTED', fetchAllProposalsWorker)
  yield takeEvery('FETCH_ALL_VOTES_FOR_ALL_PROPOSALS_REQUESTED', fetchAllVotesForAllProposalsWorker)
}