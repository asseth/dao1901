import React from 'react';
import {Button, Form, FormControl, FormGroup} from 'react-bootstrap';
import {Dao1901Members, web3} from '../../../contracts/Dao1901Members.sol';

let members = [];

export default class Votes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMember: null,
      memberAddress: '',
      memberAddressToCheck: '',
      validationMemberAddress: null,
      validationYearsDuration: null,
      yearsDuration: '',
      dao1901Members_head: '',
      dao1901Members_isMember: '',
      dao1901Members_subscription1: ''
    };
    this.checkMembership = this.checkMembership.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMemberAddressChange = this.handleMemberAddressChange.bind(this);
    this.handleYearsDurationChange = this.handleYearsDurationChange.bind(this);
    this.memberList = this.memberList.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  componentDidMount() {
    this.memberList((mElements) => {
      members = mElements.map((m, i) => <p key={`member_${i}`}>member {i}: {m}</p>);
      this.forceUpdate();
    });

    Dao1901Members.head((e, r) => this.setState({dao1901Members_head: r}));
  }

  memberList(cb) {
    let members = [];
    let addr = '';
    Dao1901Members.head((e, r) => {
      addr = r;
      while (addr != 0) {
        if (Dao1901Members.isMember(addr)) {
          members.push(addr)
        }
        addr = Dao1901Members.subscriptions(addr)[1]; // Access with .next ?
      }
      cb(members);
    });
  }

  checkMembership(e) {
    e.preventDefault();
    let res = Dao1901Members.isMember(this.state.memberAddressToCheck).toString();
    this.setState({isMember: res});
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

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  subscribe(e) {
    e.preventDefault();
    Dao1901Members.subscribe.sendTransaction(this.state.memberAddress, this.state.yearsDuration, {from: web3.eth.accounts[0]});
  }

  render() {
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

        <Form inline>
          <FormControl
            name="memberAddressToCheck"
            onChange={this.handleChange}
            placeholder="Enter an address"
            type="text"
            value={this.state.memberAddressToCheck}
          />
          <Button
            bsStyle="primary"
            name="checkMembership"
            onClick={this.checkMembership}
            type="submit"
          >
            Check Membership
          </Button>
          <p>{this.state.isMember}</p>
        </Form>

        <div>
          {members}
        </div>

        <dl>
          <dt>Address</dt>
          <dd>Dao1901Members.address (the contract address): {Dao1901Members.address}</dd>

          <dt>Head</dt>
          <dd>Dao1901Members.head() (the last member): {this.state.dao1901Members_head}</dd>
        </dl>
      </div>
    );
  }
}
