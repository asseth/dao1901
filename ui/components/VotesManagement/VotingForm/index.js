import React from "react"
import {Button, Input, Form, FormControl, FormGroup, HelpBlock} from "reactstrap"
import {Field, reduxForm} from 'redux-form'
const validate = values => {
  const errors = {}
  if (!values.proposalId) {
    errors.proposalId = 'Required'
  } else if (Number.isInteger(Number(values.proposalId))) {
    errors.username = 'Must be a number'
  }
  if (!values.voteValue) {
    errors.voteValue = 'Required'
  } else if (values.voteValue.length <= 60) {
    errors.voteValue = 'Length must be 60 char max'
  }
  return errors
}
const warn = values => {
  const warnings = {}
  return warnings
}
const proposalIDInput = ({input, label, type, placeholder, id}) => (
  <div>
    <Input
      {...input}
      id={id}
      label={label}
      placeholder={placeholder}
      required
      type={type}
    />
  </div>
)
const voteValueInput = ({className, input, label, type, placeholder, id}) => (
  <div>
    <Input
      {...input}
      className={className}
      id={id}
      label={label}
      placeholder={placeholder}
      required
      type={type}
    />
  </div>
)
let VotingForm = (props) => {
  const {handleSubmit, onVoteSubmit} = props
  return (
    <div id="voteForm" className="form">
      <Form onSubmit={ handleSubmit(onVoteSubmit) }>
        <div className="row">
          <div className="col-12">
            <Field
              component={proposalIDInput}
              label="proposalId"
              name="proposalId"
              placeholder="Enter the proposal ID"
              type="text"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Field
              component={voteValueInput}
              label="voteValue"
              name="voteValue"
              placeholder="Enter your vote"
              type="text"
            />
          </div>
        </div>

        <Button
          block
          color="primary"
          outline
          size="lg"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}
export default VotingForm = reduxForm({
  form: 'voting'
})(VotingForm)