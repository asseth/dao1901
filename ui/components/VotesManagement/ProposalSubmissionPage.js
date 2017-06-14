import React from 'react'
import List from '../common/List'
import ProposalSubmissionForm from './ProposalSubmissionForm'
import ProposalsListItem from './ProposalsListItem'

function ProposalSubmissionPage(props) {
  const {createProposal, proposals} = props
  return (
    <div id="ProposalSubmissionContainer">
      <ProposalSubmissionForm
        createProposal={createProposal}
      />

      <h3>Proposals</h3>
      <p>{`There are ${proposals && proposals.length} proposals`}</p>
      <List
        component={ProposalsListItem}
        items={proposals}
      />
    </div>
  )
}

export default ProposalSubmissionPage
