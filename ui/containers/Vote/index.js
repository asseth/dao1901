import React from "react";
import VotesByProposalForm from '../../component/VotesByProposalForm';
import ProposalForm from '../../component/ProposalForm';
import List from '../../component/List';
import ProposalsListItem from '../../component/ProposalsListItem';
import VotesListItem from '../../component/VotesListItem';
import VoteForm from '../../component/VoteForm';
import Dao1901Contracts from 'dao1901-contracts';

let Dao1901Votes = null;

// Log Events
/*
window.Dao1901VotesEvents = Dao1901Votes.allEvents(null,
  function (error, log) {
    if (error) {
      console.log('Event error: ', error)
    }
    else {
      console.log('Event: ', log)
    }
  }
);
*/

export default class Votes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposalListItems: [],
      totalProposals: null,
      votesListItems: [],
      membersContractAddress: ''
    };
    this.getAllProposals = ::this.getAllProposals;
    this.getAllVotesByProposal = ::this.getAllVotesByProposal;
    this.getProposalByIndex = ::this.getProposalByIndex;
    this.getTotalProposals = ::this.getTotalProposals;
  }

  componentWillMount() {
    Dao1901Contracts().then((contracts) => {
      console.log('contracts.Dao1901Votes', contracts.Dao1901Votes);
      Dao1901Votes = contracts.Dao1901Votes;
    });
    // Generate proposals list
    Dao1901Votes.membersContract()
      .then((addr) => {
        this.setState({membersContractAddress: addr});
        console.log('membersContractAddress: ', addr);
      })
      .catch((err) => {throw new Error(err)});
    this.getAllProposals();
  }

  /**
   * Get proposal by index
   * @param proposalIndex
   * @param cb
   */
  getProposalByIndex(proposalIndex, cb) {
    Dao1901Votes.proposals(proposalIndex)
      .then((proposal) => {
        cb(proposal[0], proposal[1].toNumber(), proposal[2]);
      })
      .catch((err) => {throw new Error(err.message)})
  }

  /**
   *  Get all proposals
   */
  getAllProposals() {
    let proposalListItems = [];
    this.getTotalProposals((totalProposals) => {
      let proposalIndex = 1; // there is no proposal index 0
      let getAllProposalListItems = (proposalIndex) => {
        if (proposalIndex <= totalProposals) {
          this.getProposalByIndex(proposalIndex, (proposalDesc, proposalDeadline) => {
            proposalListItems.push({proposalDesc, proposalDeadline});
            proposalIndex += 1;
            getAllProposalListItems(proposalIndex);
          })
        } else {
          console.log('proposalListItems', proposalListItems);
          this.setState({proposalListItems: proposalListItems});
        }
      };
      getAllProposalListItems(proposalIndex);
    });
  }

  /**
   * Get Total Proposals
   * @param cb
   */
  getTotalProposals(cb) {
    Dao1901Votes.nProposals()
      .then((total) => {
        this.setState({totalProposals: total.toNumber()}, cb(total.toNumber()));
      })
      .catch((err) => {throw new Error(err.message)})
  }

  /**
   * Get All Votes By Proposal
   * @param proposalId
   * @returns {Array}
   */
  getAllVotesByProposal(proposalId) {
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

  render() {
    return (
      <div className="Dao1901Votes">
        <h2>Dao1901Votes</h2>
        <p><strong>Dao1901Votes Contract Address:</strong> {Dao1901Votes.address}</p>
        <p><strong>Dao1901Members Contract Address used in Dao1901Votes:</strong> {this.state.membersContractAddress}
        </p>

        <h3>Proposals</h3>
        <p>{`There are ${this.state.totalProposals} proposals`}</p>
        <List
          component={ProposalsListItem}
          items={this.state.proposalListItems}
        />

        <ProposalForm
          getAllProposals={this.getAllProposals}
        />

        <VoteForm/>

        <VotesByProposalForm
          getAllVotesByProposal={this.getAllVotesByProposal}
        />

        <List
          component={VotesListItem}
          items={this.state.votesListItems}
        />
      </div>
    );
  }
}