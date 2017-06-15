import React from 'react'
import List from '../common/List'
import ProposalSubmissionForm from './ProposalSubmissionForm'
import ProposalsListItem from './ProposalsListItem'

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

export default ProposalSubmissionPage
