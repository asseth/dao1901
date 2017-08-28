import {toastr} from 'react-redux-toastr'

export default function toastrManager(nextProps, props) {
  let newErrorsLength = nextProps.errors.length
  let newTxsLength = nextProps.txs.length

  // Checking if new tx and show a toast message
  if (newTxsLength > 0 && newTxsLength !== props.txs.length) {
    let message, title
    switch (nextProps.txs[newTxsLength - 1].event) {
      case 'TX_ADD_MEMBER_SUCCEED':
        message = `The member ${nextProps.members[nextProps.members.length - 1].memberAddress} has been added successfully`
        title = 'Membership management'
        break
      case 'TX_REVOKE_MEMBER_SUCCEED':
        message = `The member has been revoked successfully`
        title = 'Membership management'
        break
      case 'TX_CREATE_PROPOSAL_SUCCEED':
        message = 'Your proposal has been successfully submitted'
        title = 'Proposal submission'
        break
      case 'TX_VOTE_SUBMISSION_SUCCEED':
        message = 'Your vote has been successfully submitted'
        title = 'Voting'
        break
      case 'TX_TRANSFER_OWNERSHIP_SUCCEED':
        message = `The ownership has been transferred to ${nextProps.ownerAddress}`
        title = 'Organization management'
        break
      default:
        throw new Error('Unknown event')
    }
    toastr.success(title, `${message} - Transaction ID: ${nextProps.txs[newTxsLength - 1].tx}`)
  }
  // Checking if new error and show a toast message
  if (newErrorsLength > 0 && newErrorsLength !== props.errors.length) {
    let message, title
    switch (nextProps.errors[newErrorsLength - 1].event) {
      case 'TX_ADD_MEMBER_FAILED':
        message = `The member ${nextProps.members[nextProps.members.length - 1].memberAddress} has not been added. Please try later`
        title = 'Error'
        break
      case 'TX_REVOKE_MEMBER_FAILED':
        message = `The member has not been revoked successfully. Please try later`
        title = 'Error'
        break
      case 'TX_CREATE_PROPOSAL_FAILED':
        message = 'An error occurred. Please try later or contact the support'
        title = 'Error'
        break
      case 'TX_VOTE_SUBMISSION_FAILED':
        message = `An error occurred. Please try later or contact the support. ` +
          `Hint: Check that the proposal id is valid and that you are registered as member`
        title = 'Error'
        break
      case 'TX_TRANSFER_OWNERSHIP_FAILED':
        message = 'You don\'t have the rights to transfer ownership'
        title = 'Error'
        break
      default:
        throw new Error('Unknown event')
    }
    toastr.error(title, message)
  }
}