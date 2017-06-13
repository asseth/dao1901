import React from "react"
import 'babel-polyfill'
import {Button, Form, FormControl, Input} from 'reactstrap'
import {Field, reduxForm} from 'redux-form'
/**
 * handleChangeProposalDeadline
 * @param e Event
 */
/*
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
 */

/**
 * handleChangeProposalDesc
 * @param e Event
 */
/*
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
 */

/*
 this.defaultProposalFormState = {
 proposalDesc: '',
 proposalDeadline: '',
 validationProposalAddressFrom: null,
 validationProposalDeadline: null,
 validationProposalDesc: null
 };
 */
const validate = values => {
  const errors = {}
  if (!values.proposalDeadline) {
    errors.proposalDeadline = 'Required'
  } else if (Number.isInteger(Number(values.proposalDeadline))) {
    errors.username = 'Must be a number'
  }
  if (!values.proposalDesc) {
    errors.proposalDesc = 'Required'
  } else if (values.proposalDesc.length <= 600) {
    errors.proposalDesc = 'Length must be 600 char max'
  }
  return errors
}
const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}
const proposalDescriptionInput = ({input, label, type, placeholder, id}) => (
  <div>
    <Input
      {...input}
      id={id}
      label={label}
      placeholder="Enter description of the proposal"
      required
      rows={5}
      type={type}
    />
  </div>
)
const proposalDeadlineInput = ({input, className, id, label, type, placeholder}) => (
  <div>
    <Input
      {...input}
      className={className}
      id={id}
      label={label}
      type={type}
      placeholder={placeholder}
    />
  </div>
)
let ProposalSubmissionForm = props => {
  const {createProposal, handleSubmit, submitSucceeded, clearSubmit, proposalDeadline, validationProposalDesc, validationProposalDeadline} = props
  console.log('propspropsprops', props)
  return (
    <div id="proposalSubmissionForm">
      <h2>Proposal Submission Form</h2>
      <Form onSubmit={ handleSubmit(createProposal) }>
        <div className="row">
          <div className="col"></div>
          <div className="col-8">
            <Field
              component={proposalDescriptionInput}
              id="proposalDescriptionInput"
              type="textarea"
              label="Proposal Description"
              name="proposalDescription"
              required
              rows={5}
            />
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col-8">
            <Field
              component={proposalDeadlineInput}
              className="m-top-15"
              id="proposalDeadlineInput"
              label="Days until deadline"
              name="proposalDeadline"
              type="text"
              placeholder="Enter the number of days until the deadline"
            />
          </div>
          <div className="col"></div>
        </div>

        <Button
          className="m-top-15"
          type="submit"
        >
          {'Submit'}
        </Button>

        {/*<Button
         className="m-top-15"
         bsStyle="primary"
         disabled={!(
         validationProposalDesc === 'success' &&
         validationProposalDeadline === 'success'
         )}
         onClick={onProposalSubmit}
         type="submit"
         >
         Submit
         </Button>*/}
      </Form>
    </div>
  )
}
export default ProposalSubmissionForm = reduxForm({
  form: 'proposalSubmission',
  validate,
  warn
})(ProposalSubmissionForm)
/*
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
 */