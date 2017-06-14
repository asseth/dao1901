import React from 'react'
import List from '../common/List'
import VoteForm from './VotingForm'
import VotesListItem from './VotesListItem'

function VotingPage (props) {
  const {onVoteSubmit, votesListItems} = props
  return (
    <div id="VotingPageContainer">
      <VoteForm
        onVoteSubmit={onVoteSubmit}
      />

      <List
        component={VotesListItem}
        items={votesListItems}
      />
    </div>
  )
}

export default VotingPage

