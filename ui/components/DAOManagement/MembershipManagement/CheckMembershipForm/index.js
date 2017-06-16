import React from 'react';
import {Button, Form, FormControl, Input} from 'reactstrap'
import {Field, reduxForm} from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.memberAddressToCheck) {
    errors.memberAddressToCheck = 'Required'
  } else if (!web3.isAddress(values.memberAddressToCheck)) {
    errors.memberAddressToCheck = 'Address is not valid'
  }
}

const CheckMembershipInput = ({id, input, label, type, placeholder}) => (
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
 * Check membership
 * @returns {XML}
 * @constructor
 */
function CheckMembershipForm(props) {
  const {checkMembership, handleSubmit} = props

  return (
    <div>
      <Form
        onSubmit={handleSubmit(checkMembership)}
      >
        <Field
          component={CheckMembershipInput}
          id="memberAddressToCheck"
          name="memberAddressToCheck"
          placeholder="Enter an address"
          type="text"
        />
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
  validate,
  //warn
})(CheckMembershipForm)