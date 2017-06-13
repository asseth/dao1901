/******************************************************************************/
/**************************** ETHEREUM ***************************************/
/******************************************************************************/
import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects'

// ========================================================
// Create Proposal
// ========================================================
let createProposal = (Dao1901Votes, proposalDesc, proposalDeadline) => {
  return new Promise((resolve, reject) => {
    Dao1901Votes.createProposal.sendTransaction(proposalDesc, proposalDeadline)
      .then((tx) => {
        console.log('TX createProposal successful. Tx Hash: ', tx);
        // Check if Tx is mined
        var setIntervalId = setInterval(() => web3.eth.getTransactionReceipt(tx, (err, receipt) => {
          if (err) reject(err.message);
          if (receipt) {
            console.log('Receipt Tx Dao1901Votes.createProposal: ', receipt);
            window.clearInterval(setIntervalId);
            //this.props.getAllProposals();
          }
        }), 2000);
      })
      .catch((err) => reject(err.message))
  })
}
function* createProposalWorker(v) {
  try {
    console.log('vvvvvvvv', v)
    let Dao1901Votes = yield select(s => s.dao.contract.Dao1901Votes)
    yield call(createProposal, Dao1901Votes, 'ghgh', 12)
    yield put({type: 'CREATE_PROPOSAL_SUCCEED'})
  } catch (e) {
    yield put({type: 'CREATE_PROPOSAL_FAILED', ...e.message})
  }
}
export default function* vote() {
  yield takeEvery('CREATE_PROPOSAL_REQUESTED', createProposalWorker);
}


