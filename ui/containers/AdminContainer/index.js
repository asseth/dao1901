import React from 'react';
import './styles.scss';
import 'babel-polyfill';
import {ToastContainer, ToastMessage} from 'react-toastr';
let ToastMessageFactory = React.createFactory(ToastMessage.animation);
import List from '../../components/common/List';
import MembersListItem from '../../components/MembershipManagement/MembersListItem';
import MemberAdditionForm from '../../components/MembershipManagement/MemberAdditionForm';
import MemberRevokationForm from '../../components/MembershipManagement/MemberRevokationForm';
import TransferOwnershipForm from '../../components/DAOManagement/TransferOwnershipForm';
import contracts from 'dao1901-contracts';
let Owned, Dao1901Members;

/**
 * Admin Page
 *
 *  - Change owner
 *  - List All Members
 *  - List All Votes for a Proposal
 *  - Add a member
 *  - Revoke a member
 */
export default class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      changeOwnerInput: '',
      eth_blockNumber: '',
      membersListItem: [],
      owner: ''
    };
    this.changeOwner = ::this.changeOwner;
    this.generateMemberListUI = ::this.generateMemberListUI;
    this.generateMemberListAddrs = ::this.generateMemberListAddrs;
    this.revokeMember = ::this.revokeMember;
    this.validateAddress = ::this.validateAddress;
  }

  async componentDidMount() {
    try {
      // Get Owned instance
      Owned = await contracts.Owned.deployed();
      // Get Dao1901Members instance
      Dao1901Members = await contracts.Dao1901Members.deployed();
    } catch (err) {
      throw new Error(err.message);
    }
    // Set Owner
    this.setState({owner: await Owned.owner()});
    this.generateMemberListUI();
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log('componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('componentDidUpdate', prevProps, prevState);
  }

  /**
   * Add a member to the organization
   * @param values
   */
  addMember(values) {
    Dao1901Members.subscribe
      .sendTransaction(values.memberAddressInput, values.yearsDurationInput, {gas: 70000})
      .then((tx) => {
        this.refs.toastContainer.success(
          `The member ${values.memberAddressInput} has been added successfully`, 'Membership management', {
            timeOut: 7000
          }
        );
        console.log(`The account ${web3.eth.defaultAccount} have added the member ${values.memberAddressInput}`);
        console.log(`Subscribe TxId: ${tx}`);
        this.generateMemberListUI();
      })
      .catch((err) => {
        this.refs.toastContainer.error(
          `The member ${values.memberAddressInput} has not been added. Please try later.`, 'Membership management', {
            timeOut: 7000
          }
        );
        console.log(`The account ${web3.eth.defaultAccount} have failed to add ${values.memberAddressInput}`);
        throw new Error(err.message);
      });
  }

  /**
   * Revoke a member by updating his subscription to zero
   * The address member is preserved on the linked list on Ethereum
   * @param values
   */
  async revokeMember(values) {
    try {
      let tx = await Dao1901Members.subscribe
        .sendTransaction(values.memberAddressInput, 0, {gas: 70000});
      this.refs.toastContainer.success(
        `The member ${values.memberAddressInput} has been revoked successfully`, 'Membership management', {
          timeOut: 7000
        });
      console.log(`The account ${web3.eth.defaultAccount} have revoked the member ${values.memberAddressInput}`);
      console.log(`Subscribe TxId: ${tx}`);
      await this.generateMemberListUI();
    }
    catch (err) {
      this.refs.toastContainer.error(
        `The member ${values.memberAddressInput} has not been revoked. Please try later.`, 'Membership management', {
          timeOut: 7000
        }
      );
      console.log(`The account ${web3.eth.defaultAccount} have failed to revoke ${values.memberAddressInput}`);
      throw new Error(err.message);
    }
  }

  /**
   * Transfer ownership
   * @param values
   * @returns {Promise.<void>}
   */
  async changeOwner(values) {
    try {
      let res = await Owned.changeOwner.sendTransaction(values.changeOwnerInput, {from: this.state.owner, gas: 200000});
      // Set new Owner
      this.setState({owner: values.changeOwnerInput});
      this.refs.toastContainer.success(
        `The ownership has been transferred to ${values.changeOwnerInput}`, '', {
          timeOut: 7000
        }
      );
      console.log(`changeOwnerTx: ${res}`);
    }
    catch (err) {
      this.refs.toastContainer.error(
        "You don't have the rights to transfer ownership", '', {
          timeOut: 7000
        }
      );
      throw new Error(err.message);
    }
  }

  /**
   * Generate member list for UI
   * set array of membersListItem in the state
   */
  generateMemberListUI() {
    this.generateMemberListAddrs((membersAddresses) => {
      let promises = membersAddresses.map((memberAddress) => {
        return Dao1901Members.subscriptions(memberAddress)
          .then((sub) => {
            let endSubscriptionDate = sub[0].toString();
            return {memberAddress, endSubscriptionDate};
          })
      });
      return Promise.all(promises)
        .then((membersListItem) => this.setState({membersListItem}));
    });
  }

  /**
   * Create Member List
   * Browse the chained list
   * @param cb
   */
  generateMemberListAddrs(cb) {
    let membersAddrs = []; // clear members array
    let addr = '';
    // Get the head of the linked list - Either Ox or the last added
    Dao1901Members.head()
      .then((r) => {
        addr = r;
        let iterateOnSubscriptions = () => {
          // First head is '0x' on metamask testnet
          // '0x0000000000000000000000000000000000000000' on metamask local geth
          // '0x0000000000000000000000000000000000000000' == 0
          // '0x' != 0
          if (addr != 0 && addr != '0x') {
            Dao1901Members.isMember(addr)
              .then((isMember) => {
                if (isMember) {
                  membersAddrs = [addr, ...membersAddrs];
                }
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
            cb(membersAddrs);
          }
        };
        iterateOnSubscriptions();
      });
  }

  /**
   * Ethereum address form validation
   * @param value
   * @param ctx
   * @param input
   * @param cb
   */
  validateAddress(value, ctx, input, cb) {
    let bool = web3.isAddress(value);
    cb(bool);
  }

  render() {
    return (
      <div className="container">
        <div>
          <ToastContainer
            ref="toastContainer"
            toastMessageFactory={ToastMessageFactory}
            className="toast-top-right"
          />
        </div>

        <div className="row">
          <div className="col">
            <h1>Admin Page</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias at blanditiis cum deserunt
              dolores error id ipsa molestias numquam optio quod sequi tempore, ut vel vero, vitae voluptas?
            </p>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col">
            <h2>{'Membership management'}</h2>
            <h3>{'Add a member'}</h3>
            <MemberAdditionForm
              addMember={::this.addMember}
              validateAddress={this.validateAddress}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h3>{'Revoke a member'}</h3>
            <MemberRevokationForm
              revokeMember={::this.revokeMember}
              validateAddress={this.validateAddress}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h3>{'Check membership'}</h3>
            {'CheckMembershipForm'}
          </div>
        </div>

        <div className="row mt-5">
          <div className="col">
            <h3>List of all members in *organization name*</h3>
            <List
              component={MembersListItem}
              items={this.state.membersListItem}
            />
          </div>
        </div>

        <div className="row mt-5 mb-5">
          <div className="col">
            <h2>Organization management</h2>
            <h3>Transfer organization ownership</h3>
            <p>
              Organization ownership gives the right to... Transfering it will result in... Make sure you understand all
              the implications.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, assumenda beatae culpa ea
              eveniet facilis fugit illo laborum molestias officiis praesentium provident quia quidem quod sunt
            </p>
            <TransferOwnershipForm
              changeOwner={this.changeOwner}
              validateAddress={this.validateAddress}
            />
          </div>
        </div>
      </div>
    );
  }
}
