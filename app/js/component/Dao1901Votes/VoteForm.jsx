import React from "react";
import {Button, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import {Dao1901Votes, web3} from "../../../../contracts/Dao1901Votes.sol";

export default class Votes extends React.Component {
  constructor(props) {
    super(props);
    this.defaultVoteFormState = {
      proposalId: '',
      validationProposalId: null,
      validationVoteValue: null,
      voteValue: ''
    };
    this.state = this.defaultVoteFormState;
    this.handleChangeProposalId = this.handleChangeProposalId.bind(this);
    this.handleChangeVoteValue = this.handleChangeVoteValue.bind(this);
    this.onVoteSubmit = this.onVoteSubmit.bind(this);
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

  handleChangeVoteValue(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      // Validation
      if (this.state.voteValue) {
        this.setState({validationVoteValue: this.state.voteValue.length <= 60 ? 'success' : 'error'})
      } else {
        this.setState({validationVoteValue: null})
      }
    });
  }

  onVoteSubmit(e) {
    e.preventDefault();
    Dao1901Votes.vote.sendTransaction(this.state.proposalId, this.state.voteValue,
      {from: web3.eth.defaultAccount, gas: 1000}, (err) => {
        if (err) throw new Error(err.message);
      });
    // Clear form fields
    this.setState(this.defaultVoteFormState);
  }

  render() {
    return (
      <div id="voteForm">
        <h2>Vote for a Proposal</h2>
        <form>
          <FormGroup
            controlId="validationProposalId"
            validationState={this.state.validationProposalId}
          >
            <FormControl
              label="proposalId"
              name="proposalId"
              onChange={this.handleChangeProposalId}
              placeholder="Enter the proposal ID"
              value={this.state.proposalId}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup
            controlId="validationVoteValue"
            validationState={this.state.validationVoteValue}
          >
            <FormControl
              label="voteValue"
              name="voteValue"
              onChange={this.handleChangeVoteValue}
              placeholder="Enter your vote"
              value={this.state.voteValue}
            />
            <FormControl.Feedback />
          </FormGroup>

          <Button
            className="m-top-15"
            bsStyle="primary"
            disabled={
              this.state.validationProposalId !== 'success' ||
              this.state.validationVoteValue !== 'success'
            }
            onClick={this.onVoteSubmit}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
