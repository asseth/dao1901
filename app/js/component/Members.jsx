import React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';
import { Dao1901Members, web3 } from '../../../contracts/Dao1901Members.sol';

export default class Votes extends React.Component {
  constructor(props) {
    super(props);

    this.memberList = this.memberList.bind(this);
  }

  memberList() {
    var members = [];
    var addr = Dao1901Members.head();
    while (addr != 0) {
      if (Dao1901Members.isMember.call(addr)) {
        members.push(addr)
      }
      addr = Dao1901Members.subscriptions(addr)[1]; // Access with .next ?
    }
    return members;
  }

  render() {
    console.log('memberList', this.memberList());
    return (
      <div className="Dao1901Members">
        <h2>Dao1901Members</h2>

        <form>
          <FormGroup
            controlId="formBasicText"
          >
            <FormControl
              type="text"
              value={''}
              placeholder="Enter text"
              onChange={() => ''}
            />
          </FormGroup>
        </form>

        <dl>
          <dt>Address</dt>
          <dd>Dao1901Members.address: {Dao1901Members.address}</dd>

          <dt>Head</dt>
          <dd>Dao1901Members.head(): {Dao1901Members.head()}</dd>

          <dt>isMember</dt>
          <dd>
            Dao1901Members.subscriptions(addr)[1]: {Dao1901Members.subscriptions('0xd8049babea3112caacfa9dfe40619c0aba0b7d91')[1]}</dd>
          <dd>
            Dao1901Members.isMember.call(Dao1901Members.head()).toString(): {Dao1901Members.isMember.call(Dao1901Members.head()).toString()}</dd>
        </dl>
      </div>
    );
  }
}
