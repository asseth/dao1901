import React from "react";
import {Button, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

import {Dao1901Votes, web3} from "../../../../contracts/Dao1901Votes.sol";

export default class Votes extends React.Component {
  constructor(props) {
    super(props);

    this.defaultVoteFormState = {
      proposalId: '',
      validationVoteAddressFrom: null,
      validationProposalId: null,
      validationVoteValue: null,
      voteAddressFrom: '',
      voteValue: ''
    };
    this.state = this.defaultVoteFormState;
    this.voteFormError = '';

    this.handleChangeProposalId = this.handleChangeProposalId.bind(this);
    this.handleChangeVoteAddressFrom = this.handleChangeVoteAddressFrom.bind(this);
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

  handleChangeVoteAddressFrom(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      // Validation
      if (this.state.voteAddressFrom) {
        this.setState({validationVoteAddressFrom: web3.isAddress(this.state.voteAddressFrom) ? 'success' : 'error'})
      } else {
        this.setState({validationVoteAddressFrom: null})
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
    try {
      Dao1901Votes.vote.sendTransaction(this.state.proposalId, this.state.voteValue, {from: this.state.voteAddressFrom});
    } catch(error) {
      this.voteFormError = error;
    }
    // Clear form fields
    this.setState(this.defaultVoteFormState);
  }

  render() {
    return (
      <div id="voteForm">
        <h2>Vote for a Proposal</h2>
        <form>
          <FormGroup
            controlId="validationVoteAddressFrom"
            validationState={this.state.validationVoteAddressFrom}
          >
            <FormControl
              label="voteAddressFrom"
              name="voteAddressFrom"
              onChange={this.handleChangeVoteAddressFrom}
              placeholder="Enter a valid ethereum address"
              value={this.state.voteAddressFrom}
            />
            <FormControl.Feedback />
            <HelpBlock>Enter a valid ethereum address</HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="validationProposalId"
            validationState={this.state.validationProposalId}
          >
            <FormControl
              label="proposalId"
              name="proposalId"
              onChange={this.handleChangeProposalId}
              placeholder="Enter a number"
              value={this.state.proposalId}
            />
            <FormControl.Feedback />
            <HelpBlock>Enter a number</HelpBlock>
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
            <HelpBlock>Enter your vote</HelpBlock>
          </FormGroup>

          <Button
            className="m-top-15"
            bsStyle="primary"
            disabled={
              this.state.validationVoteAddressFrom !== 'success' ||
              this.state.validationProposalId !== 'success' ||
              this.state.validationVoteValue !== 'success'
            }
            onClick={this.onVoteSubmit}
            type="submit"
          >
            Submit
          </Button>
        </form>

        {/*For debugging purposes*/}
        {this.voteFormError.message}
      </div>
    );
  }
}
