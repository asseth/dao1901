import React from "react";
import VotingPage from '../../components/VotesManagement/VotingPage'
import {connect} from 'react-redux'

// Log Events
/*
window.Dao1901VotesEvents = Dao1901Votes.allEvents(null,
  function (error, log) {
    if (error) {
      console.log('Event error: ', error)
    }
    else {
      console.log('Event: ', log)
    }
  }
);
*/

const mapStateToProps = (state) => {
  console.log('statestate', state)
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    onVoteSubmit: (values) => dispatch({type: 'VOTE_SUBMISSION_REQUESTED', values})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VotingPage)