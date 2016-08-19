import React from "react";

import DisplayVotes from './DisplayVotes';
import ProposalForm from './ProposalForm';
import VoteForm from './VoteForm';
import {Dao1901Votes} from "../../../../contracts/Dao1901Votes.sol";

export default class Votes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      proposalList: []
    };

    this.addProposalToList = this.addProposalToList.bind(this);
    this.calculateDeadline = this.calculateDeadline.bind(this);
    this.generateProposalList = this.generateProposalList.bind(this);
    this.voteList = this.voteList.bind(this);
  }

  componentWillMount() {
    this.generateProposalList();
  }

  /**
   * Add new proposal to ProposalList
   */
  addProposalToList() {
    let newProposalList = this.state.proposalList.slice();
    const proposalLength = Dao1901Votes.nVotes().toNumber();
    newProposalList.push(
      <ul key={`proposal_${proposalLength}`}>
        <li>Description: {Dao1901Votes.proposals(proposalLength)[0]}</li>
        <li>Time until deadline: {this.calculateDeadline(Dao1901Votes.proposals(proposalLength)[1].toNumber())}</li>
      </ul>);
    this.setState({proposalList: newProposalList});
  }

  calculateDeadline(timestamp) {
    let diff = timestamp - Math.floor(Date.now() / 1000);
    let days = Math.floor(diff / 86400);
    // Total hours - days in hours
    let hours = Math.floor(diff / 3600) - (days * 24);
    // Total minutes - days and hours in minutes
    let minutes = Math.floor(diff / 60) - ((days * 24 * 60) + (hours * 60));
    return `${days} days - ${hours} hours - ${minutes} minutes`;
  }

  /**
   *  Generate the complete proposal list
   */
  generateProposalList() {
    let proposalList = [];
    console.log('generateProposalList - Dao1901Votes.nVotes().toNumber()-------- ', Dao1901Votes.nVotes().toNumber());
    for (let i = 1; i < Dao1901Votes.nVotes().toNumber() + 1; i++) {
      proposalList.push(
        <ul key={`proposal_${i}`}>
          <li>Description: {Dao1901Votes.proposals(i)[0]}</li>
          <li>Days until deadline: {this.calculateDeadline(Dao1901Votes.proposals(i)[1].toNumber())}</li>
        </ul>
      )
    }
    console.log('generateProposalList proposalList', proposalList);
    this.setState({proposalList: proposalList});
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
        <dl>
          <dt>Members Contract</dt>
          <dd>Dao1901Votes.membersContract(): {Dao1901Votes.membersContract()}</dd>
        </dl>

        <h2>Proposals</h2>
        {this.state.proposalList}

        <h2>Number of votes (proposals ?)</h2>
        <p>{Dao1901Votes.nVotes().toNumber()}</p>

        <ProposalForm
          addProposalToList={this.addProposalToList}
        />

        <VoteForm />

        <DisplayVotes />
      </div>
    );
  }
}
