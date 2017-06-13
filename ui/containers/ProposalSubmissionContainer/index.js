import React from 'react'
import ProposalSubmissionPage from '../../components/VotesManagement/ProposalSubmissionPage'
import {connect} from 'react-redux'
import {actions} from '../../redux/votes/votesSagas'

console.log('actions', actions)

const mapStateToProps = s => ({})

const mapDispatchToProps = dispatch => {
  return ({
    createProposal: (values) => dispatch({type: 'CREATE_PROPOSAL_REQUESTED', values})
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(ProposalSubmissionPage)