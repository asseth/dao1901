import React from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Dao1901Members, web3 } from '../../../contracts/Dao1901Members.sol';

export default class Votes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memberAddress: '',
      validationMemberAddress: null,
      validationYearsDuration: null,
      yearsDuration: ''
    };

    this.handleMemberAddressChange = this.handleMemberAddressChange.bind(this);
    this.handleYearsDurationChange = this.handleYearsDurationChange.bind(this);
    this.memberList = this.memberList.bind(this);
    this.subscribe = this.subscribe.bind(this);
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

  handleMemberAddressChange(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      // Validation
      if (this.state.memberAddress) {
        this.setState({validationMemberAddress: web3.isAddress(this.state.memberAddress) ? 'success' : 'error'})
      } else {
        this.setState({validationMemberAddress: null})
      }
    });
  }

  handleYearsDurationChange(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      // Validation
      if (this.state.yearsDuration) {
        this.setState({validationYearsDuration: Number.isInteger(Number(this.state.yearsDuration)) ? 'success' : 'error'})
      } else {
        this.setState({validationYearsDuration: null})
      }
    });
  }

  subscribe(e) {
    e.preventDefault();
    console.log('this.state.memberAddress, this.state.yearsDuration', this.state.memberAddress, this.state.yearsDuration);
    Dao1901Members.subscribe(this.state.memberAddress, this.state.yearsDuration);
  }


  render() {
    console.log('memberList', this.memberList());
    return (
      <div className="Dao1901Members">
        <h2>Dao1901Members</h2>
        <h3>Add a member</h3>
        <Form>
          <FormGroup
            controlId="memberAddress"
            validationState={this.state.validationMemberAddress}
          >
            <FormControl
              name="memberAddress"
              onChange={this.handleMemberAddressChange}
              placeholder="Enter the member Ethereum address"
              type="text"
              value={this.state.memberAddress}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup
            controlId="yearsDuration"
            validationState={this.state.validationYearsDuration}
          >
            <FormControl
              name="yearsDuration"
              onChange={this.handleYearsDurationChange}
              placeholder="Enter the number of years the subscription will last"
              type="text"
              value={this.state.yearsDuration}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button
            bsStyle="primary"
            onClick={this.subscribe}
            type="submit"
          >
            Add Member
          </Button>
        </Form>


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
