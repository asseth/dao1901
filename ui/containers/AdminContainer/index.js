import React from 'react';
import {connect} from 'react-redux'
import './styles.scss';
import 'babel-polyfill';

import List from '../../components/common/List';
import MembersListItem from '../../components/DAOManagement/MembershipManagement/MembersListItem';
import MemberAdditionForm from '../../components/DAOManagement/MembershipManagement/MemberAdditionForm';
import MemberRevokationForm from '../../components/DAOManagement/MembershipManagement/MemberRevokationForm';
import TransferOwnershipForm from '../../components/DAOManagement/TransferOwnershipForm';


/**
 * Admin Page
 *
 *  - Change owner
 *  - List All Members
 *  - Add a member
 *  - Revoke a member
 */
let AdminPage = (props) => {
  const {addMember, members, changeOwner, membersListItem, revokeMember, web3Wrap} = props
  //const {web3} = web3Wrap
  console.log('membersmembersmembersmembers', members)

  return (
    <div className="container">
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
            addMember={addMember}
            validateAddress={window.web3 && web3.isAddress}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <h3>{'Revoke a member'}</h3>
          <MemberRevokationForm
            revokeMember={revokeMember}
            validateAddress={window.web3 && web3.isAddress}
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
            items={members}
          />
        </div>
      </div>

      {/*<div className="row mt-5 mb-5">
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
            changeOwner={changeOwner}
            validateAddress={window.web3 && web3.isAddress}
          />
        </div>
      </div>*/}
    </div>
  )
}

const mapStateToProps = s => {
  return {
    members: s.dao.members
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMember: (values) => dispatch({type: 'ADD_MEMBER_REQUESTED', values})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)