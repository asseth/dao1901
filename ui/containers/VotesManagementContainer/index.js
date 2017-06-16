import React from "react";
import {connect} from 'react-redux'
import NestedLists from '../../components/common/NestedLists'
import VoteForm from './../../components/VotesManagement/VotingForm'

function VotingPage(props) {
  const {onVoteSubmit, votes} = props
  return (
    <div id="VotingPageContainer">
      <h1>Voting</h1>
      <p>But it's more about commenting proposals actually</p>
      <div className="m-top-50 row">
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
          <NestedLists
            items={votes}
          />
        </div>
      </div>
    </div>
  )
}



const mapStateToProps = (state) => {
  return {
    votes: state.vote.votes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onVoteSubmit: (values) => dispatch({type: 'VOTE_SUBMISSION_REQUESTED', values})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VotingPage)