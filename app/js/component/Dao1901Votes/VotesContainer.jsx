import {Dao1901Votes} from "../../../../contracts/Dao1901Votes.sol";
import React from "react";
import DisplayVotes from './DisplayVotes';
import ProposalForm from './ProposalForm';
import List from './List';
import ProposalsListItem from './ProposalsListItem';
import VoteForm from './VoteForm';

export default class Votes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposalListItems: [],
      totalProposals: null
    };
    this.getAllProposals = this.getAllProposals.bind(this);
    this.getProposalByIndex = this.getProposalByIndex.bind(this);
    this.getTotalProposals = this.getTotalProposals.bind(this);
    this.voteList = this.voteList.bind(this);
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
    Dao1901Votes.proposals(proposalIndex, (e, proposal) => {
      cb(proposal[0], proposal[1].toNumber())
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

  getTotalProposals(cb) {
    Dao1901Votes.nProposals((err, total) => {
      if (err) {
        throw new Error(err.message);
      }
      this.setState({totalProposals: total.toNumber()}, cb(total.toNumber()));
    });
  }

  // Retrieve the votes
  voteList(voteId) {
    var votes = [];
    var addr = Dao1901Votes.proposals(voteId)[2]; // vote list head
    while (addr != 0) {
      let v = Dao1901Votes.getVote(voteId, addr);
      votes.push(v[0]);
      addr = v[1];
    }
    return votes;
  }

  render() {
    return (
      <div className="Dao1901Votes">
        <h2>Dao1901Votes</h2>
        <p>Dao1901Votes Contract Address: {Dao1901Votes.address}</p>
        <p>Dao1901Members Contract Address in Dao1901Votes: {Dao1901Votes.membersContract((e, r) => r)}</p>

        <h3>Proposals</h3>
        <p>{`There are ${this.state.totalProposals} proposals`}</p>
        <List
          component={ProposalsListItem}
          getAllProposals={this.getAllProposals}
          items={this.state.proposalListItems}
        />

        <ProposalForm/>

        <VoteForm/>

        <DisplayVotes />
      </div>
    );
  }
}
