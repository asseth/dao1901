import React from 'react';
import './styles.scss';
import {Button, Form, FormControl, Input} from 'reactstrap'
import {Field, reduxForm} from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.memberAddressInput) {
    errors.memberAddressInput = 'Required'
  } else if (!web3.eth.isAddress(values.memberAddressInput)) {
    errors.username = 'Address is not valid'
  }
  return errors
}

const RevokeMemberAddressInput = ({input, label, type, placeholder, id}) => (
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
 * Member revokation - Stateless functional component
 * @param props
 * @returns {XML}
 * @constructor
 */
function MemberRevokationForm(props) {
  const {revokeMember, handleSubmit, submitSucceeded, clearSubmit} = props

  return (
    <Form
      onSubmit={handleSubmit(revokeMember)}
    >
      <Field
        component={RevokeMemberAddressInput}
        id="RevokeMemberAddressInput"
        label="memberAddressLabel"
        name="memberAddress"
        placeholder="Enter the Ethereum address of the member"
        required
        type="text"
      />
      <Button
        block
        color="warning"
        outline
        size="lg"
      >
        {'Revoke Member'}
      </Button>
    </Form>
  )
}

export default MemberRevokationForm = reduxForm({
  form: 'MemberRevokationForm',
  validate,
  //warn
})(MemberRevokationForm)