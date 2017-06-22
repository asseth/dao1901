import React from 'react'
import {connect} from 'react-redux'
import List from '../../components/common/List'
import ProposalSubmissionForm from '../../components/VotesManagement/ProposalSubmissionForm/index'
import ProposalsListItem from '../../components/VotesManagement/ProposalsListItem'

function ProposalSubmissionPage(props) {
  const {createProposal, proposals} = props
  return (
    <div id="ProposalSubmissionPageContainer">
      <h1>Proposal Submission</h1>
      <h2>Submit a proposal</h2>
      <ProposalSubmissionForm
        createProposal={createProposal}
      />

      <div className="m-top-50">
        <h3>Current proposals</h3>
        <p>{`There are ${proposals && proposals.length} proposals`}</p>
        <List
          component={ProposalsListItem}
          items={proposals}
        />
        <h3>Past proposals</h3>
        <p>Proposal n°1: Adopted. Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <p>Proposal n°2: Adopted. Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <p>Proposal n°3: Adopted. Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
    </div>
  )
}

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