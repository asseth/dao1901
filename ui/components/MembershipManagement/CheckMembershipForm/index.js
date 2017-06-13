import React from 'react';
import {Button, Form} from 'reactstrap';

/**
 * CheckMembership
 * Call fn that returns a boolean
 * @param e Event Object
 */
/*
checkMembership(e) {
  e.preventDefault();
  console.log('Check member address: ', this.state.memberAddressToCheck);
  Dao1901Members.isMember(this.state.memberAddressToCheck)
    .then((res) => {
      (res ?
        console.log(`${this.state.memberAddressToCheck} is a member.`)
        : console.log(`${this.state.memberAddressToCheck} is not a member.`));
      this.setState({isMember: res.toString()});
    })
    .catch((err) => {throw new Error(err)});
}
*/

/**
 * Check membership
 * @returns {XML}
 * @constructor
 */
export default function CheckMembershipForm(props) {
  return (
    <div>
      <h2>Check Membership</h2>
      <Form inline>
        <FormControl
          name="memberAddressToCheck"
          onChange={this.handleChange}
          placeholder="Enter an address"
          type="text"
          value={this.props.memberAddressToCheck}
        />
        <Button
          bsStyle="primary"
          name="checkMembership"
          onClick={this.props.checkMembership}
          type="submit"
        >
          Submit
        </Button>
        <p>{isMember}</p>
      </Form>
    </div>
  )
}