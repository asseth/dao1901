import React from 'react'
import {connect} from 'react-redux'
import List from '../../components/common/List'
import ProposalSubmissionForm from '../../components/VotesManagement/ProposalSubmissionForm'
import ProposalsListItem from '../../components/VotesManagement/ProposalsListItem'

function ProposalSubmissionPage(props) {
  const {createProposal, proposals} = props
  return (
    <div id="ProposalSubmissionPageContainer">
      <ProposalSubmissionForm
        createProposal={createProposal}
      />

      <div className="m-top-50">
        <h3>Proposals</h3>
        <p>{`There are ${proposals && proposals.length} proposals`}</p>
        <List
          component={ProposalsListItem}
          items={proposals}
        />
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