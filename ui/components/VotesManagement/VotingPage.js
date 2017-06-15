import React from 'react'
import MultipleLists from '../common/MultipleLists'
import VoteForm from './VotingForm'
import VotesListItem from './VotesListItem'

function VotingPage (props) {
  const {onVoteSubmit, votes} = props

  return (
    <div id="VotingPageContainer">
      <VoteForm
        onVoteSubmit={onVoteSubmit}
      />

      <h2>What voters said for each proposal</h2>
      <MultipleLists
        component={VotesListItem}
        items={votes}
      />

      <h2>Running Proposals</h2>
      <p>Proposal _name_ _number_: will be settle on the 25 of June 2017</p>
      <p>Proposal _name_ _number_: will be settle on the 04 of August 2017</p>
      <p>Proposal _name_ _number_: will be settle on the 18 of October 2017</p>
      <p>Proposal _name_ _number_: will be settle on the 26 of October 2017</p>
    </div>
  )
}

export default VotingPage

