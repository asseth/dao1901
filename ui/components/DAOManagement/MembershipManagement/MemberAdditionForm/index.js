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
export default function MemberAdditionForm(props) {
  return (
    <AvForm
      onValidSubmit={(event, values) => props.addMember(values)}
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
      <AvField
        id="yearsDurationInput"
        label="yearsDurationLabel"
        labelHidden
        min="1"
        name="yearsDurationInput"
        placeholder="Enter the number of years the subscription will last"
        required
        type="number"
      />
      <Button
        block
        color="primary"
        outline
        size="lg"
      >
        {'Add Member'}
      </Button>
    </AvForm>
  )
}
