import * as React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import NestedLists from '../../components/common/NestedLists'
import VoteForm from '../../components/VotesManagement/VotingForm'
import toastrManager from '../../helpers/toastrManager'
// ========================================================
// Voting
// ========================================================
class VotingPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    toastrManager(nextProps, this.props)
  }

  render() {
    const {onVoteSubmit, votes} = this.props
    return (
      <div id="VotingPageContainer">
        <h1>Voting</h1>
        <p>But it's more about commenting proposals actually</p>
        <div className="m-top-50 row">
          <div className="col-12">
            <h2>Vote for a Proposal <span className="caution">member only</span></h2>
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
}
const mapStateToProps = (state) => {
  return {
    errors: state.vote.errors,
    txs: state.vote.txs,
    votes: state.vote.votes
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onVoteSubmit: (values) => dispatch({type: 'VOTE_SUBMISSION_REQUESTED', values})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VotingPage)