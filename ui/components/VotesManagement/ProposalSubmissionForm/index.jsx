import React from "react"
import {Button, Form, FormControl, Input} from 'reactstrap'
import {Field, reduxForm} from 'redux-form'

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

const proposalDescriptionInput = ({input, label, type, placeholder, id}) => (
  <div>
    <Input
      {...input}
      id={id}
      label={label}
      placeholder={placeholder}
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
  const {createProposal, handleSubmit, submitSucceeded, clearSubmit} = props
  return (
    <div id="proposalSubmissionForm" className="form">
      <Form onSubmit={ handleSubmit(createProposal) }>
        <div className="row">
          <div className="col-12">
            <Field
              component={proposalDescriptionInput}
              id="proposalDescriptionInput"
              placeholder="Enter description of the proposal"
              type="textarea"
              label="Proposal Description"
              name="proposalDescription"
              required
              rows={5}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Field
              component={proposalDeadlineInput}
              id="proposalDeadlineInput"
              label="Days until deadline"
              name="proposalDeadline"
              type="text"
              placeholder="Enter the number of days until the deadline"
            />
          </div>
        </div>

        <Button
          block
          color="primary"
          outline
          size="lg"
          className="m-top-20"
          type="submit"
        >
          {'Submit'}
        </Button>
      </Form>
    </div>
  )
}
export default ProposalSubmissionForm = reduxForm({
  form: 'proposalSubmission',
  validate,
})(ProposalSubmissionForm)