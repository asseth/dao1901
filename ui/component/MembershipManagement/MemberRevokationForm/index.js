import React from 'react';
//import './styles.scss';
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Button} from 'reactstrap';

/**
 * Member Addition - Stateless functional component
 * @param props
 * @returns {XML}
 * @constructor
 */
export default function MemberRevokationForm(props) {
  return (
    <AvForm
      onValidSubmit={(event, values) => props.revokeMember(values)}
    >
      <AvField
        id="memberAddressInput"
        label="memberAddressLabel"
        labelHidden
        name="memberAddressInput"
        placeholder="Enter the Ethereum address of the member"
        required
        type="text"
        validate={{async: props.validateAddress}}
      />
      <Button
        block
        color="warning"
        outline
        size="lg"
      >
        {'Revoke Member'}
      </Button>
    </AvForm>
  )
}
