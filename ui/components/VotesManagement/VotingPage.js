import React from 'react'
import MultipleLists from '../common/MultipleLists'
import VoteForm from './VotingForm'
import VotesListItem from './VotesListItem'
function VotingPage(props) {
  const {onVoteSubmit, votes} = props
  return (
    <div id="VotingPageContainer">
      <div className="row">
        <div className="col-12">
          <h2>Vote for a Proposal</h2>
          <VoteForm
            onVoteSubmit={onVoteSubmit}
          />
        </div>
      </div>

      <div className="m-top-50 row">
        <div className="col-12">
          <h2>What voters said for each proposal</h2>
          <MultipleLists
            component={VotesListItem}
            items={votes}
          />
        </div>
      </div>

      <div className="m-top-50 row">
        <div className="col-12">
          <h2>Running Proposals</h2>
          <p>Proposal _name_ _number_: will be settle on the 25 of June 2017</p>
          <p>Proposal _name_ _number_: will be settle on the 04 of August 2017</p>
          <p>Proposal _name_ _number_: will be settle on the 18 of October 2017</p>
          <p>Proposal _name_ _number_: will be settle on the 26 of October 2017</p>
        </div>
      </div>
    </div>
  )
}
export default VotingPage

