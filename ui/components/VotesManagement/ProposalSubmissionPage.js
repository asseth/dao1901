import React from 'react';
import List from '../common/List'
import ProposalSubmissionForm from './ProposalSubmissionForm'
import ProposalsListItem from './ProposalsListItem'

function ProposalSubmissionPage(props) {
  const {createProposal, proposalListItems, totalProposals} = props
  return (
    <div id="ProposalSubmissionContainer">
      <ProposalSubmissionForm
        createProposal={createProposal}
      />

      <h3>Proposals</h3>
      <p>{`There are ${totalProposals} proposals`}</p>
      <List
        component={ProposalsListItem}
        items={proposalListItems}
      />
    </div>
  );
}

export default ProposalSubmissionPage;
