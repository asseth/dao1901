import React from "react";
import {Button, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

//import {Dao1901Votes} from "../../../../contracts/Dao1901Votes.sol";

export default class VotesByProposalForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      proposalId: '',
      validationProposalId: null
    };

    this.handleChangeProposalId = this.handleChangeProposalId.bind(this);
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
      <div id="getAllVotesByProposal">
        <h2>Get the Votes for a Proposal</h2>
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
          </FormGroup>
        </form>

        <Button
          className="m-top-15"
          bsStyle="primary"
          disabled={!(this.state.validationProposalId === 'success')}
          onClick={() => this.props.getAllVotesByProposal(this.state.proposalId)}
          type="submit"
        >
          Submit
        </Button>
      </div>
    );
  }
}
