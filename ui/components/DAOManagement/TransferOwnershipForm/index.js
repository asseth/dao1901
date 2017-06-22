import React from 'react'
import {Button, Form} from 'reactstrap'
import {Field, reduxForm} from 'redux-form'
import {Input} from '../../common/Inputs'
// ------------------------------------
// Validation
// ------------------------------------
const validate = values => {
  const errors = {}
  if (!values.newOwnerAddress) {
    errors.newOwnerAddress = 'Required'
  } else if (!window.web3.isAddress(values.newOwnerAddress)) {
    errors.newOwnerAddress = 'Address is not valid'
  }
  return errors
}
// ------------------------------------
// Form
// ------------------------------------
function TransferOwnershipForm(props) {
  const {transferOwnership, handleSubmit, submitSucceeded, clearSubmit} = props
  return (
    <div id="TransferOwnershipForm" className="form">
      <Form onSubmit={handleSubmit(transferOwnership)}>
        <div className="row">
          <div className="col-12">
            <Field
              component={Input}
              id="changeOwnerInput"
              label="changeOwnerLabel"
              name="newOwnerAddress"
              placeholder="New owner address"
              type="text"
            />
          </div>
        </div>

        <Button
          block
          color="danger"
          outline
          size="lg"
        >
          {'Change Owner'}
        </Button>
      </Form>
    </div>
  )
}
export default TransferOwnershipForm = reduxForm({
  form: 'TransferOwnershipForm',
  validate,
})(TransferOwnershipForm)