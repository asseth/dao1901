import React from "react";
import {Button, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

import {Dao1901Votes} from "../../../../contracts/Dao1901Votes.sol";

export default class DisplayVotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      proposalId: '',
      validationProposalId: null,
      votes: []
    };

    this.getVotes = this.getVotes.bind(this);
    this.handleChangeProposalId = this.handleChangeProposalId.bind(this);
  }


  getVotes() {
    let votes = [];
    let addr = Dao1901Votes.proposals(this.state.proposalId)[2]; // vote list head
    while (addr != 0) {
      let v = Dao1901Votes.getVote(this.state.proposalId, addr);
      votes.push(v[0]);
      addr = v[1];
    }
    let votesElements = votes.map((vote, i) => <li key={`${i}_${vote}`}>{vote}</li>);
    this.setState({votes: votesElements});
  }

  handleChangeProposalId(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      // Validation
      if (this.state.proposalId) {
        this.setState({validationProposalId: Number.isInteger(Number(this.state.proposalId)) ? 'success' : 'error'})
      } else {
        this.setState({validationProposalId: null})
      }
    });
  }

  render() {
    return (
      <div id="displayVotes">
        <h2>Get the votes for a proposal</h2>
        <form>
          <FormGroup
            controlId="validationProposalId"
            validationState={this.state.validationProposalId}
          >
            <FormControl
              label="proposalId"
              name="proposalId"
              onChange={this.handleChangeProposalId}
              placeholder="Enter a valid proposal ID"
              value={this.state.proposalId}
            />
            <FormControl.Feedback />
            <HelpBlock>Enter a valid proposal ID</HelpBlock>
          </FormGroup>
        </form>

        <Button
          className="m-top-15"
          bsStyle="primary"
          disabled={!(this.state.validationProposalId === 'success')}
          onClick={this.getVotes}
          type="submit"
        >
          Submit
        </Button>

        <h3>Results</h3>
        <ul>
          {this.state.votes}
        </ul>
      </div>
    );
  }
}
