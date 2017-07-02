import React from 'react';
import {connect} from 'react-redux'
import List from '../../components/common/List';
import MembersListItem from '../../components/DAOManagement/MembershipManagement/MembersListItem';
import MemberAdditionForm from '../../components/DAOManagement/MembershipManagement/MemberAdditionForm';
import MemberRevokationForm from '../../components/DAOManagement/MembershipManagement/MemberRevokationForm';
import CheckMembershipForm from '../../components/DAOManagement/MembershipManagement/CheckMembershipForm';
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
  const {addMember, checkMembership, dao, transferOwnership, revokeMember} = props
  const {members} = dao

  return (
    <div className="">
      <div className="row">
        <div className="col">
          <h1>Administration dashboard</h1>
          <p>
            This is where authorized people can manage the organization.
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <h2>{'Membership management'}</h2>
          <h3>{'Add a member '}<span className="caution">owner only</span></h3>
          <MemberAdditionForm
            addMember={addMember}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <h3>{'Revoke a member '}<span className="caution">owner only</span></h3>
          <MemberRevokationForm
            revokeMember={revokeMember}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col">
          <h3>{'Check membership'}</h3>
          <CheckMembershipForm
            checkMembership={checkMembership}
          />
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

      <div className="row mt-5 mb-5">
        <div className="col">
          <h2>Organization management</h2>
          <h3>Transfer organization ownership <span className="caution">owner only</span></h3>
          <p>
            Organization ownership gives the right to control the DAO. Make sure you understand all
            the implications.
          </p>
          <p>{`The current owner is: ${dao.ownerAddress}`}</p>
          <TransferOwnershipForm
            transferOwnership={transferOwnership}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = s => {
  return {
    dao: s.dao
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMember: (values) => dispatch({type: 'ADD_MEMBER_REQUESTED', values}),
    transferOwnership: (values) => dispatch({type: 'TRANSFER_OWNERSHIP_REQUESTED', values}),
    checkMembership: (values) => dispatch({type: 'CHECK_MEMBERSHIP_REQUESTED', values}),
    revokeMember: (values) => dispatch({type: 'REVOKE_MEMBER_REQUESTED', values}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)