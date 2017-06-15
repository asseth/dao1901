import React from 'react';
import {Button, Form, FormControl, Input} from 'reactstrap'
import {Field, reduxForm} from 'redux-form'

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
 * Check membership
 * @returns {XML}
 * @constructor
 */
function CheckMembershipForm(props) {
  const {checkMembership, handleSubmit, isMember} = props

  return (
    <div>
      <Form
        onSubmit={handleSubmit(checkMembership)}
      >
        <Field
          component={RevokeMemberAddressInput}
          id="memberAddressToCheck"
          name="memberAddressToCheck"
          placeholder="Enter an address"
          type="text"
        />
        <Button
          block
          color="primary"
          name="checkMembership"
          outline
          size="lg"
          type="submit"
        >
          {'Check Membership'}
        </Button>
        <p>{isMember}</p>
      </Form>
    </div>
  )
}

export default CheckMembershipForm = reduxForm({
  form: 'CheckMembershipForm',
  //validate,
  //warn
})(CheckMembershipForm)