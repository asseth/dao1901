import React from 'react'
import {Button, Form} from 'reactstrap'
import {Field, reduxForm} from 'redux-form'
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
  return errors
}
// ------------------------------------
// Form
// ------------------------------------
function MemberRevokationForm(props) {
  const {revokeMember, handleSubmit, submitSucceeded, clearSubmit} = props
  return (
    <div id="MemberRevokationForm" className="form">
      <Form onSubmit={handleSubmit(revokeMember)}>
        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
              id="RevokeMemberAddressInput"
              label="memberAddressLabel"
              name="memberAddress"
              placeholder="Enter the Ethereum address of the member"
              type="text"
            />
          </div>
        </div>

        <Button
          block
          color="warning"
          outline
          size="lg"
        >
          {'Revoke Member'}
        </Button>
      </Form>
    </div>
  )
}
export default MemberRevokationForm = reduxForm({
  form: 'MemberRevokationForm',
  validate,
})(MemberRevokationForm)