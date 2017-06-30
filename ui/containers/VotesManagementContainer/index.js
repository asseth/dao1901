import React, {Component} from "react"
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr'
import NestedLists from '../../components/common/NestedLists'
import VoteForm from './../../components/VotesManagement/VotingForm'

class VotingPage extends Component {
  constructor(props) {
    super(props)
    this.lastTx = ''
  }

  componentWillUpdate(nextProps) {
    // Checking if new tx and show a toast message
    if (nextProps.txs.length > 0) {
      let newTx = nextProps.txs[nextProps.txs.length - 1].tx
      if (this.lastTx !== newTx) {
        this.lastTx = newTx
        let message, title
        switch (nextProps.txs[nextProps.txs.length - 1].event) {
          case 'VOTE_SUBMISSION_SUCCEED':
            message = 'Your vote has been successfully submitted. Transaction ID'
            title = 'Voting'
            break;
          default:
           throw new Error('Unknown event')
        }
        toastr.success(title, `${message}: ${newTx}`)
      }
    }
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