import React from "react";
import {Button, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

import {Dao1901Votes, web3} from "../../../../contracts/Dao1901Votes.sol";

export default class Votes extends React.Component {
  constructor(props) {
    super(props);
    this.defaultProposalFormState = {
      proposalAddressFrom: '',
      proposalDesc: '',
      proposalDeadline: '',
      validationProposalAddressFrom: null,
      validationProposalDeadline: null,
      validationProposalDesc: null
    };
    this.state = this.defaultProposalFormState;

    // Proposal
    this.handleChangeProposalAddressFrom = this.handleChangeProposalAddressFrom.bind(this);
    this.handleChangeProposalDeadline = this.handleChangeProposalDeadline.bind(this);
    this.handleChangeProposalDesc = this.handleChangeProposalDesc.bind(this);
    this.onProposalSubmit = this.onProposalSubmit.bind(this);
  }


  handleChangeProposalDeadline(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      // Validation
      if (this.state.proposalDeadline) {
        this.setState({validationProposalDeadline: Number.isInteger(Number(this.state.proposalDeadline)) ? 'success' : 'error'})
      } else {
        this.setState({validationProposalDeadline: null})
      }
    });
  }

  handleChangeProposalDesc(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      // Validation
      if (this.state.proposalDesc) {
        this.setState({validationProposalDesc: this.state.proposalDesc.length <= 600 ? 'success' : 'error'})
      } else {
        this.setState({validationProposalDesc: null})
      }
    });
  }

  handleChangeProposalAddressFrom(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      // Validation
      if (this.state.proposalAddressFrom) {
        this.setState({validationProposalAddressFrom: web3.isAddress(this.state.proposalAddressFrom) ? 'success' : 'error'})
      } else {
        this.setState({validationProposalAddressFrom: null})
      }
    });
  }

  onProposalSubmit(e) {
    e.preventDefault();
    Dao1901Votes.createProposal.sendTransaction(
      this.state.proposalDesc,
      this.state.proposalDeadline,
      {from: this.state.proposalAddressFrom}
    );
    this.props.addProposalToList();
    // Clear form fields
    this.setState(this.defaultProposalFormState);
  }


  render() {
    return (
      <div id="proposalForm">
        <h2>Proposal Submission</h2>
        <form>
          <FormGroup
            controlId="validationProposalAddressFrom"
            validationState={this.state.validationProposalAddressFrom}
          >
            <FormControl
              label="proposalAddressFrom"
              name="proposalAddressFrom"
              onChange={this.handleChangeProposalAddressFrom}
              placeholder="Enter a valid ethereum address"
              value={this.state.proposalAddressFrom}
            />
            <FormControl.Feedback />
            <HelpBlock>Enter a valid ethereum address</HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="validationProposalDesc"
            validationState={this.state.validationProposalDesc}
          >
            <FormControl
              componentClass="textarea"
              label="Description"
              name="proposalDesc"
              onChange={this.handleChangeProposalDesc}
              placeholder="Enter description of the proposal"
              rows={5}
              value={this.state.proposalDesc}
            />
            <FormControl.Feedback />
            <HelpBlock>Description should not exceed 600 characters</HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="validationProposalDeadline"
            validationState={this.state.validationProposalDeadline}
          >
            <FormControl
              className="m-top-15"
              label="Days until deadline"
              name="proposalDeadline"
              type="text"
              placeholder="Enter the number of days until the deadline"
              onChange={this.handleChangeProposalDeadline}
              value={this.state.proposalDeadline}
            />
            <FormControl.Feedback />
            <HelpBlock>Days should be expressed as a number</HelpBlock>
          </FormGroup>

          <Button
            className="m-top-15"
            bsStyle="primary"
            disabled={!(
              this.state.validationProposalAddressFrom === 'success' &&
              this.state.validationProposalDesc === 'success' &&
              this.state.validationProposalDeadline === 'success'
            )}
            onClick={this.onProposalSubmit}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
