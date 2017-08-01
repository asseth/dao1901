import React from 'react'
import {Button, Form} from 'reactstrap'
import {Field, reduxForm, reset} from 'redux-form'
import {Input} from '../../common/Inputs'
// ------------------------------------
// Validation
// ------------------------------------
const validate = values => {
  const errors = {}
  if (!values.proposalId) {
    errors.proposalId = 'Required'
  } else if (!Number.isInteger(Number(values.proposalId))) {
    errors.proposalId = 'Proposal ID must be a number'
  }
  if (!values.voteValue) {
    errors.voteValue = 'Required'
  } else if (values.voteValue.length >= 60) {
    errors.voteValue = 'Length must be 60 char max'
  }
  return errors
}
// ------------------------------------
// After Submit
// ------------------------------------
const afterSubmit = (result, dispatch) =>
  dispatch(reset('votingForm'))
// ------------------------------------
// Form
// ------------------------------------
let VotingForm = (props) => {
  const {handleSubmit, onVoteSubmit} = props
  return (
    <div id="voteForm" className="form">
      <Form onSubmit={handleSubmit(onVoteSubmit)}>
        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
              label="proposalId"
              name="proposalId"
              placeholder="Enter the proposal ID"
              type="number"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
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
          {'Submit'}
        </Button>
      </Form>
    </div>
  )
}
export default VotingForm = reduxForm({
  form: 'votingForm',
  onSubmitSuccess: afterSubmit,
  validate
})(VotingForm)