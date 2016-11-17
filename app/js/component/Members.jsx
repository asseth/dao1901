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
      subscribeSuccess: null,
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
      let iterateOnSubscriptions = () => {
        // First head is '0x' on metamask testnet
        // '0x0000000000000000000000000000000000000000' on metamask local geth
        // '0x0000000000000000000000000000000000000000' == 0
        // '0x' != 0
        if (addr != 0 && addr != '0x') {
          Dao1901Members.isMember(addr, (errIsMember, isMember) => {
            if (errIsMember) {
              console.log('fails to retrieve isMember:', errIsMember);
              return;
            }
            if (isMember) members.push(addr);
            Dao1901Members.subscriptions(addr, (errSubscriptions, subscription) => {
              if (errSubscriptions) {
                console.log('fails to retrieve subscriptions.next:', errSubscriptions);
                return;
              }
              addr = subscription[1]; // the next element
              iterateOnSubscriptions();
            });
          });
        } else {
          cb(members);
        }
      };
      iterateOnSubscriptions();
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
    console.log(' web3.eth.defaultAccount', web3.eth.defaultAccount);
    console.log('this.state.memberAddress', this.state.memberAddress);
    //let tx = Dao1901Members.subscribe.sendTransaction(this.state.memberAddress, this.state.yearsDuration, {from: web3.eth.defaultAccount});
    Dao1901Members.subscribe
      .sendTransaction(this.state.memberAddress, this.state.yearsDuration, {gas: 70000}, // gasUsed: 68642
        (err, tx) => {
          if (err) {
            console.log('subscribe fails: ', err);
            this.setState({subscribeSuccess: false});
          }
          else {
            console.log(`${web3.eth.defaultAccount} add ${this.state.memberAddress}`);
            console.log('subscribe TX: ', tx);
            this.setState({subscribeSuccess: true});
          }
        });
  }

  render() {
    let subscribeSuccess = '';
    if (this.state.subscribeSuccess !== null) {
      if (this.state.subscribeSuccess) {
        subscribeSuccess = 'Send successfully';
      } else {
        subscribeSuccess = 'Failure. Check your permission';
      }
    }
    return (
      <div className="Dao1901Members">
        <h2>Dao1901Members</h2>
        <h3>Add/revoke a member</h3>
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
            Submit
          </Button>
          <div>
            {subscribeSuccess}
          </div>
        </Form>

        <hr/>

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

        <h3>Member list</h3>
        <div>
          {members}
        </div>

        <hr/>
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
