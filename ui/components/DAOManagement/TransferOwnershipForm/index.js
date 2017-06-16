import React from 'react'
//import './styles.scss';
import {Button, Form, FormControl, Input} from 'reactstrap'
import {Field, reduxForm} from 'redux-form'
const validate = values => {
  const errors = {}
  if (!values.newOwnerAddress) {
    errors.newOwnerAddress = 'Required'
  } else if (!web3.isAddress(values.newOwnerAddress)) {
    errors.newOwnerAddress = 'Address is not valid'
  }
  return errors
}
const ChangeOwnerInput = ({input, label, type, placeholder, id}) => (
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
/**
 * Transfer ownership form - Stateless functional component
 * @param props
 * @returns {XML}
 * @constructor
 */
function TransferOwnershipForm(props) {
  const {transferOwnership, handleSubmit, submitSucceeded, clearSubmit} = props
  return (
    <div id="TransferOwnershipForm" className="form">
      <Form
        onSubmit={handleSubmit(transferOwnership)}
      >
        <div className="row">
          <div className="col-12">
            <Field
              component={ChangeOwnerInput}
              id="changeOwnerInput"
              label="changeOwnerLabel"
              name="newOwnerAddress"
              placeholder="New owner address"
              required
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
  //warn
})(TransferOwnershipForm)