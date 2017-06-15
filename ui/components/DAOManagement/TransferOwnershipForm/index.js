import React from 'react';
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
    <Form
      onSubmit={handleSubmit(transferOwnership)}
    >
      <Field
        component={ChangeOwnerInput}
        id="changeOwnerInput"
        label="changeOwnerLabel"
        name="newOwnerAddress"
        placeholder="New owner address"
        required
        type="text"
      />
      <Button
        block
        color="danger"
        outline
        size="lg"
      >
        {'Change Owner'}
      </Button>
    </Form>
  )
}

export default TransferOwnershipForm = reduxForm({
  form: 'TransferOwnershipForm',
  validate,
  //warn
})(TransferOwnershipForm)