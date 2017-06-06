import React from 'react';
import './styles.scss';
import 'babel-polyfill';
import {ToastContainer, ToastMessage} from 'react-toastr';
let ToastMessageFactory = React.createFactory(ToastMessage.animation);
import List from '../../component/List';
import {AvInput, AvForm} from 'availity-reactstrap-validation';
import {Button} from 'reactstrap';
import contracts from 'dao1901-contracts';
let Dao1901Votes;

export default class ProposalSubmission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentWillMount() {
    // Get Dao1901Votes instance
    try {
      Dao1901Votes = await contracts.Dao1901Votes.deployed();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  render() {
    return (
      <div id="proposalForm">
        <h2>Proposal Submission Form</h2>
        <AvForm>
        <div className="row">
          <div className="col"></div>
          <div className="col-8">
            <AvInput
              id="proposalDescriptionInput"
              type="textarea"
              label="Proposal Description"
              name="proposalDescription"
              placeholder="Enter description of the proposal"
              required
              rows={5}
            />
          </div>
          <div className="col"></div>
        </div>


          {/*
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
           */}

        </AvForm>
      </div>
    )
  }
}