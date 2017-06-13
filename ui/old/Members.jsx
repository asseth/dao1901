import React from 'react';
// Todo Change to Reactstrap
import {Button, Form, FormControl, FormGroup} from 'react-bootstrap';
//import {Dao1901Members, web3} from '../../../contracts/Dao1901Members.sol';
console.log('web3 in members.jsx', web3);
let members = [];

export default class Members extends React.Component {
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
      dao1901Members_subscription: ''
    };
    this.checkMembership = ::this.checkMembership;
    this.handleChange = ::this.handleChange;
    this.handleMemberAddressChange = ::this.handleMemberAddressChange;
    this.handleYearsDurationChange = ::this.handleYearsDurationChange;
    this.memberList = ::this.memberList;
    this.subscribe = ::this.subscribe;
  }

  componentDidMount() {
    this.memberList((mElements) => {
      members = mElements.map((m, i) => <p key={`member_${i}`}>member {i}: {m}</p>);
      this.forceUpdate();
    });
    console.log('Members componentDidMount Dao1901Members', Dao1901Members)
    Dao1901Members.head().then((e, r) => this.setState({dao1901Members_head: r}));
  }

  /**
   * Create Member List
   * Browse the chained list
   * @param cb
   */
  memberList(cb) {
    let members = [];
    let addr = '';
    Dao1901Members.head()
      .then((r) => {
        addr = r;
        let iterateOnSubscriptions = () => {
          // On metamask testnet: first head is '0x'
          // On on metamask with local Geth: '0x0000000000000000000000000000000000000000'
          if (addr != 0 && addr != '0x' && addr != '0x0') {
            Dao1901Members.isMember(addr)
              .then((isMember) => {
                if (isMember) members.push(addr);
                Dao1901Members.subscriptions(addr)
                  .then((subscription) => {
                    addr = subscription[1]; // the next element
                    iterateOnSubscriptions();
                  })
                  .catch((errSubscriptions) => {
                    throw new Error('fails to retrieve subscriptions.next:', errSubscriptions);
                  })
              })
              .catch((errIsMember) => {
                if (errIsMember) {
                  console.log('fails to retrieve isMember:', errIsMember);
                  return;
                }
              })
          } else {
            cb(members);
          }
        };
        iterateOnSubscriptions();
      });
  }

  /**
   * handleMemberAddressChange
   * handle input "member address change"
   * @param e Event Object
   */
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

  /**
   * handleYearsDurationChange
   * @param e Event Object
   */
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

  /**
   * handleChange
   * Simple handle of onChange
   * @param e
   */
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  /**
   * subscribe
   * Add/revoke a member
   * @param e
   */
  subscribe(e) {
    e.preventDefault();
    Dao1901Members.subscribe
      .sendTransaction(this.state.memberAddress, this.state.yearsDuration, {gas: 70000})
      .then((tx) => {
        console.log(`${web3.eth.defaultAccount} JUST ADDED ${this.state.memberAddress}`);
        console.log('Subscribe TX: ', tx);
        this.setState({subscribeSuccess: true});
      })
      .catch((err) => {
        console.log(`${web3.eth.defaultAccount} TRIED TO ADD ${this.state.memberAddress}`);
        console.log('Subscription fails: ', err);
        this.setState({subscribeSuccess: false});
      });
  }

  /**
   * React.js Render method
   * @returns {XML}
   */
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
        <h2>Add/revoke a member</h2>
        <Form>
          <FormGroup
            controlId="memberAddress"
            validationState={this.state.validationMemberAddress}
          >
            <FormControl
              name="memberAddress"
              onChange={this.handleMemberAddressChange}
              placeholder="Enter the member ETH address"
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



        <h3>Member list</h3>
        <div>
          {members.length !== 0 ? members : 'No Members'}
        </div>
      </div>
    );
  }
}
