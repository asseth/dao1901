import React from 'react';
//import './styles.scss';
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Button} from 'reactstrap';

/**
 * Transfer ownership form - Stateless functional component
 * @param props
 * @returns {XML}
 * @constructor
 */
export default function TransferOwnershipForm(props) {
  return (
    <AvForm
      onValidSubmit={(event, values) => props.changeOwner(values)}
    >
      <AvField
        id="changeOwnerInput"
        label="changeOwnerLabel"
        labelHidden
        name="changeOwnerInput"
        placeholder="New owner address"
        required
        type="text"
        validate={{async: props.validateAddress}}
      />
      <Button
        block
        color="danger"
        outline
        size="lg"
      >
        {'Change Owner'}
      </Button>
    </AvForm>
  )
}