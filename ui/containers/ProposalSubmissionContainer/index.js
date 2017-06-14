import React from 'react'
import ProposalSubmissionPage from '../../components/VotesManagement/ProposalSubmissionPage'
import {connect} from 'react-redux'
// import {actions} from '../../redux/votes/votesSagas'

const mapStateToProps = s => {
  return {
    proposals: s.vote.proposals
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    createProposal: (values) => dispatch({type: 'CREATE_PROPOSAL_REQUESTED', values}),
    //getAllProposals: () => dispatch({type: 'FETCH_ALL_PROPOSALS_REQUESTED'})  Triggered in saga bootstrap for now
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(ProposalSubmissionPage)