import React from "react";
import VotesByProposalForm from '../../components/VotesManagement/VotesByProposalForm';
import List from '../../components/common/List';
import VotesListItem from '../../components/VotesManagement/VotesListItem';
import VoteForm from '../../components/VotesManagement/VoteForm';
//import Dao1901Contracts from 'dao1901-contracts';
//let Dao1901Votes = null;

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

export default class Votes extends React.Component {
  render() {
    return (
      <div className="Dao1901Votes">
        <VoteForm/>

        <VotesByProposalForm
          getAllVotesByProposal={this.getAllVotesByProposal}
        />

        <List
          component={VotesListItem}
          items={this.state.votesListItems}
        />
      </div>
    );
  }
}