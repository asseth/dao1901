/******************************************************************************/
/**************************** ETHEREUM ***************************************/
/******************************************************************************/
import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects'

/**
 * Get proposal by index
 * @param proposalIndex
 * @param cb
 */
let getProposalByIndex = (Dao1901Votes, proposalIndex, cb) => {
  Dao1901Votes.proposals(proposalIndex)
    .then((proposal) => {
      cb(proposal[0], proposal[1].toNumber(), proposal[2]);
    })
    .catch((err) => {throw new Error(err.message)})
}

/**
 * getTotalProposals
 * @param Dao1901Votes
 * @param cb
 */
let getTotalProposals = (Dao1901Votes, cb) => {
  Dao1901Votes.nProposals().then(n => cb(n.valueOf()))
}

/**
 * Get All Votes By Proposal
 * @param proposalId
 * @returns {Array}
 */
let getAllVotesByProposal = (Dao1901Votes, proposalId) => {
  let votesListItems = [];
  let addr = 0;
  let generateVoteList = (proposalId, addr) => {
    if (addr != 0) {
      Dao1901Votes.getVote(proposalId, addr)
        .then((vote) => {
          votesListItems.push({voterAddr: addr, proposalId: proposalId, voteValue: vote[0]});
          addr = vote[1];
          generateVoteList(proposalId, addr);
        })
        .catch((err) => {throw new Error(err)});
    } else {
      this.setState({votesListItems: votesListItems});
    }
  };
  this.getProposalByIndex(proposalId, (proposalDesc, proposalDeadline, voterHead) => {
    addr = voterHead;
    generateVoteList(proposalId, addr);
  });
}

/**
 * Get All Proposal
 * @param Dao1901Votes
 */
let getAllProposals = (Dao1901Votes) => {
  let proposalListItems = [];
  getTotalProposals(Dao1901Votes, (totalProposals) => {
    let proposalIndex = 1; // there is no proposal index 0
    let getAllProposalListItems = (proposalIndex) => {
      if (proposalIndex <= totalProposals) {
        getProposalByIndex(Dao1901Votes, proposalIndex, (proposalDesc, proposalDeadline) => {
          proposalListItems.push({proposalDesc, proposalDeadline});
          proposalIndex += 1;
          getAllProposalListItems(proposalIndex);
        })
      } else {
        console.log('proposalListItems', proposalListItems);
      }
    };
    getAllProposalListItems(proposalIndex);
  })
}

/**
 * Create Proposal
 * @param Dao1901Votes
 * @param proposalDesc
 * @param proposalDeadline
 * @returns {Promise}
 */
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
            getAllProposals(Dao1901Votes);
          }
        }), 2000);
      })
      .catch((err) => reject(err.message))
  })
}

function* createProposalWorker({values}) {
  try {
    const {proposalDescription, proposalDeadline} = values
    let Dao1901Votes = yield select(s => s.dao.contract.Dao1901Votes)
    yield call(createProposal, Dao1901Votes, proposalDescription, proposalDeadline)
    yield put({type: 'CREATE_PROPOSAL_SUCCEED'})
  } catch (e) {
    yield put({type: 'CREATE_PROPOSAL_FAILED', e})
  }
}

export default function* vote() {
  yield takeEvery('CREATE_PROPOSAL_REQUESTED', createProposalWorker);
}


