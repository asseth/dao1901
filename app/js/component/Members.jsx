import React from 'react';
import {Button, Form, FormControl, FormGroup} from 'react-bootstrap';
import {Dao1901Members, web3} from '../../../contracts/Dao1901Members.sol';

export default class Votes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memberAddress: '',
      validationMemberAddress: null,
      validationYearsDuration: null,
      yearsDuration: '',
      dao1901Members_head: '',
      dao1901Members_isMember: '',
      dao1901Members_subscription1: ''
    };

    this.handleMemberAddressChange = this.handleMemberAddressChange.bind(this);
    this.handleYearsDurationChange = this.handleYearsDurationChange.bind(this);
    this.memberList = this.memberList.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  componentWillMount() {
    Dao1901Members.head((e, r) => this.setState({dao1901Members_head: r}, () => {
      if (this.state.dao1901Members_head != 0) {
        Dao1901Members.isMember(this.state.dao1901Members_head, (e, r) => {
          console.log('isMember: ', e, r);
        })
      }
    }));

    Dao1901Members.subscriptions('0xd8049babea3112caacfa9dfe40619c0aba0b7d91', (e, r) => {
      //console.log(e, r);
      this.setState({dao1901Members_subscription1: r[1]})
    });
  }

  memberList() {
    let members = [];
    let addr = '';

    Dao1901Members.head((e, r) => {
      addr = r;
      console.log('addr', addr);
      while (!addr) {
        console.log('WHILE addr', addr);
        if (Dao1901Members.isMember.call(addr)) {
          members.push(addr)
        }
        addr = Dao1901Members.subscriptions(addr)[1]; // Access with .next ?
      }
      return members;
    });
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
          <dd>Dao1901Members.head(): {this.state.dao1901Members_head}</dd>

          <dt>isMember</dt>
          <dd>
            Dao1901Members.subscriptions(addr)[1]: {this.state.dao1901Members_subscription1}
          </dd>

          <dd>
            Dao1901Members.isMember.call(Dao1901Members.head()).toString(): {this.state.dao1901Members_isMember}
          </dd>
        </dl>
      </div>
    );
  }
}
