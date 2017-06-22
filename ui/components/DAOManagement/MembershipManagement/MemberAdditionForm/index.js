import React from 'react'
import {Button, Form} from 'reactstrap'
import {Field, reduxForm, reset} from 'redux-form'
import {Input} from '../../../common/Inputs'
// ------------------------------------
// Validation
// ------------------------------------
const validate = values => {
  const errors = {}
  if (!values.memberAddress) {
    errors.memberAddress = 'Required'
  } else if (!window.web3.isAddress(values.memberAddress)) {
    errors.memberAddress = 'Address is not valid'
  }
  if (!values.yearsDuration) {
    errors.yearsDuration = 'Required'
  } else if (!(Number.isInteger(Number(values.yearsDuration)) && Number(values.yearsDuration) > 0)) {
    errors.yearsDuration = 'Year(s) of subscription must be a number superior to zero'
  }
  return errors
}
// ------------------------------------
// After Submit
// ------------------------------------
const afterSubmit = (result, dispatch) =>
  dispatch(reset('MemberAdditionForm'))
// ------------------------------------
// Form
// ------------------------------------
function MemberAdditionForm(props) {
  const {addMember, handleSubmit} = props
  return (
    <div id="MemberAdditionForm" className="form">
      <Form
        onSubmit={handleSubmit(addMember)}
      >
        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
              id="AddMemberAddress"
              label="AddMemberAddressLabel"
              name="memberAddress"
              placeholder="Enter the Ethereum address of the member"
              type="text"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
              id="yearsDuration"
              label="yearsDurationLabel"
              name="yearsDuration"
              placeholder="Enter the number of years the subscription will last"
              type="number"
            />
          </div>
        </div>
        <Button
          block
          color="primary"
          outline
          size="lg"
        >
          {'Add Member'}
        </Button>
      </Form>
    </div>
  )
}
export default MemberAdditionForm = reduxForm({
  form: 'MemberAdditionForm',
  onSubmitSuccess: afterSubmit,
  validate,
})(MemberAdditionForm)