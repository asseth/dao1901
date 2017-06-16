import React from 'react';
import './styles.scss';
import {Button, Form, FormControl, Input} from 'reactstrap'
import {Field, reduxForm} from 'redux-form'
import {toastr} from 'react-redux-toastr'

const validate = values => {
  const errors = {}
  if (!values.memberAddressInput) {
    errors.memberAddressInput = 'Required'
  } else if (!web3.eth.isAddress(values.memberAddressInput)) {
    errors.username = 'Address is not valid'
  }
  if (!values.yearsDurationInput) {
    errors.yearsDurationInput = 'Required'
  } else if (!(Number.isInteger(Number(values.yearsDurationInput)) && Number(values.yearsDurationInput) > 0)) {
    errors.yearsDurationInput = 'Must be a number'
  }
  return errors
}
const warn = values => {
  const warnings = {}
  return warnings
}

const memberAddressInput = ({input, label, type, placeholder, id}) => (
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
const yearsDurationInput = ({input, className, id, label, type, placeholder}) => (
  <div>
    <Input
      {...input}
      className={className}
      id={id}
      label={label}
      type={type}
      placeholder={placeholder}
    />
  </div>
)

/**
 * Member Addition - Stateless functional component
 * @param props
 * @returns {XML}
 * @constructor
 */
function MemberAdditionForm(props) {
  const {addMember, handleSubmit, submitSucceeded, clearSubmit} = props

  return (
    <Form
      onSubmit={handleSubmit(addMember)}
    >
      <Field
        component={memberAddressInput}
        id="AddMemberAddress"
        label="AddMemberAddressLabel"
        name="memberAddress"
        placeholder="Enter the Ethereum address of the member"
        required
        type="text"
      />
      <Field
        component={yearsDurationInput}
        id="yearsDuration"
        label="yearsDurationLabel"
        name="yearsDuration"
        placeholder="Enter the number of years the subscription will last"
        required
        type="number"
      />
      <Button
        block
        color="primary"
        //onClick={() => toastr.success('The title', 'The message')}
        outline
        size="lg"
      >
        {'Add Member'}
      </Button>
    </Form>
  )
}

export default MemberAdditionForm = reduxForm({
  form: 'MemberAdditionForm',
  validate,
  //warn
})(MemberAdditionForm)