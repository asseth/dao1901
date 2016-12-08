import React from "react";
import {Button, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

//import {Dao1901Votes, web3} from "../../../../contracts/Dao1901Votes.sol";

export default class Votes extends React.Component {
  constructor(props) {
    super(props);
    this.defaultProposalFormState = {
      proposalDesc: '',
      proposalDeadline: '',
      validationProposalAddressFrom: null,
      validationProposalDeadline: null,
      validationProposalDesc: null
    };
    this.state = this.defaultProposalFormState;

    this.handleChangeProposalDeadline = ::this.handleChangeProposalDeadline;
    this.handleChangeProposalDesc = ::this.handleChangeProposalDesc;
    this.onProposalSubmit = ::this.onProposalSubmit;
  }

  /**
   * handleChangeProposalDeadline
   * @param e Event
   */
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

  /**
   * handleChangeProposalDesc
   * @param e Event
   */
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

  /**
   * onProposalSubmit
   * @param e Event
   */
  onProposalSubmit(e) {
    e.preventDefault();
    Dao1901Votes.createProposal.sendTransaction(
      this.state.proposalDesc,
      this.state.proposalDeadline,
      {from: web3.eth.defaultAccount})
      .then((tx) => {
        console.log('TX createProposal successful. Tx Hash: ', tx);
        // Clear form fields
        this.setState(this.defaultProposalFormState);
        console.log('tx', tx);

        // Check if Tx is mined
        var setIntervalId = setInterval(() =>  web3.eth.getTransactionReceipt(tx, (err, receipt) => {
          if (err) throw new Error(err.message);
          if (receipt) {
            console.log('Receipt Tx Dao1901Votes.createProposal: ', receipt);
            window.clearInterval(setIntervalId);
            this.props.getAllProposals();
          }
        }), 2000);
      })
      .catch((err) => {throw new Error(err.message)})
  }


  render() {
    return (
      <div id="proposalForm">
        <h2>Proposal Submission</h2>
        <form>
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
          </FormGroup>

          <Button
            className="m-top-15"
            bsStyle="primary"
            disabled={!(
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
