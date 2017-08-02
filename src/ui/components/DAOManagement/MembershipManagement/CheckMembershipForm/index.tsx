import * as React from 'react'
import {Button, Form} from 'reactstrap'
import {Field, reduxForm, reset} from 'redux-form'
import {Input} from '../../../common/Inputs'
// ------------------------------------
// Validation
// ------------------------------------
const validate = values => {
  const errors = {}
  if (!values.memberAddressToCheck) {
    errors.memberAddressToCheck = 'Required'
  } else if (!window.web3.isAddress(values.memberAddressToCheck)) {
    errors.memberAddressToCheck = 'Address is not valid'
  }
  return errors
}
// ------------------------------------
// After Submit
// ------------------------------------
const afterSubmit = (result, dispatch) =>
  dispatch(reset('CheckMembershipForm'))
// ------------------------------------
// Form
// ------------------------------------
function CheckMembershipForm(props) {
  const {checkMembership, handleSubmit} = props
  return (
    <div id="CheckMembershipForm" className="form">
      <Form onSubmit={handleSubmit(checkMembership)}>
        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
              id="memberAddressToCheck"
              name="memberAddressToCheck"
              placeholder="Enter an address"
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
          {'Check Membership'}
        </Button>
      </Form>
    </div>
  )
}
export default CheckMembershipForm = reduxForm({
  form: 'CheckMembershipForm',
  onSubmitSuccess: afterSubmit,
  validate,
})(CheckMembershipForm)