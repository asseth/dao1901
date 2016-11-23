import {Dao1901Votes} from "../../../../contracts/Dao1901Votes.sol";
import React from "react";
import VotesByProposalForm from './VotesByProposalForm';
import ProposalForm from './ProposalForm';
import List from './List';
import ProposalsListItem from './ProposalsListItem';
import VotesListItem from './VotesListItem';
import VoteForm from './VoteForm';

// Log Events
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

export default class Votes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposalListItems: [],
      totalProposals: null,
      votesListItems: []
    };
    this.getAllProposals = this.getAllProposals.bind(this);
    this.getAllVotesByProposal = this.getAllVotesByProposal.bind(this);
    this.getProposalByIndex = this.getProposalByIndex.bind(this);
    this.getTotalProposals = this.getTotalProposals.bind(this);
  }

  componentWillMount() {
    // Generate proposals list
    this.getAllProposals();
  }

  /**
   * Get proposal by index
   * @param proposalIndex
   * @param cb
   */
  getProposalByIndex(proposalIndex, cb) {
    Dao1901Votes.proposals(proposalIndex, (err, proposal) => {
      if (err) {
        throw new Error(err.message);
      }
      console.log('proposal', proposal);
      cb(proposal[0], proposal[1].toNumber(), proposal[2]);
    });
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
          this.setState({proposalListItems: proposalListItems});
        }
      };
      getAllProposalListItems(proposalIndex);
    });
  }

  /**
   * Get All Votes By Proposal
   * @param proposalId
   * @returns {Array}
   */
  getAllVotesByProposal(proposalId) {
    console.log('proposalId', proposalId);
    let votesListItems = [];
    let addr = 0;
    this.getProposalByIndex(proposalId, (proposalDesc, proposalDeadline, voterHead) => {
      addr = voterHead;
      console.log('addr getAllVotesByProposal', addr);
      if (addr != 0) {
        Dao1901Votes.getVote(proposalId, addr, (v) => {
          votesListItems.push(v[0]);
          addr = v[1];
        });
      }
    });
    return votesListItems;
  }

  /**
   * Get Total Proposals
   * @param cb
   */
  getTotalProposals(cb) {
    Dao1901Votes.nProposals((err, total) => {
      if (err) {
        throw new Error(err.message);
      }
      this.setState({totalProposals: total.toNumber()}, cb(total.toNumber()));
    });
  }

  render() {
    return (
      <div className="Dao1901Votes">
        <h2>Dao1901Votes</h2>
        <p>Dao1901Votes Contract Address: {Dao1901Votes.address}</p>
        {/*<p>Dao1901Members Contract Address in Dao1901Votes: {Dao1901Votes.membersContract((e, r) => r)}</p>*/}

        <h3>Proposals</h3>
        <p>{`There are ${this.state.totalProposals} proposals`}</p>
        <List
          component={ProposalsListItem}
          items={this.state.proposalListItems}
        />

        <ProposalForm/>

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
