import React from 'react'
import List from '../common/List'
import VoteForm from './VotingForm'
import VotesListItem from './VotesListItem'

function VotingPage (props) {
  const {onVoteSubmit, votes} = props
  return (
    <div id="VotingPageContainer">
      <VoteForm
        onVoteSubmit={onVoteSubmit}
      />

      <List
        component={VotesListItem}
        items={votes}
      />
    </div>
  )
}

export default VotingPage

