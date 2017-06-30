import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr'
import List from '../../components/common/List'
import ProposalSubmissionForm from '../../components/VotesManagement/ProposalSubmissionForm/index'
import ProposalsListItem from '../../components/VotesManagement/ProposalsListItem'

class ProposalSubmissionPage extends Component {
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
          case 'CREATE_PROPOSAL_SUCCEED':
            message = 'Your proposal has been successfully submitted. Transaction ID'
            title = 'Proposal submission'
            break;
          default:
            throw new Error('Unknown event')
        }
        toastr.success(title, `${message}: ${newTx}`)
      }
    }
  }

  render() {
    const {createProposal, proposals} = this.props
    return (
      <div id="ProposalSubmissionPageContainer">
        <h1>Proposal Submission</h1>
        <h2>Submit a proposal <span className="caution">owner only</span></h2>
        <ProposalSubmissionForm
          createProposal={createProposal}
        />

        <div className="m-top-50">
          <h3>Current proposals</h3>
          <p>{`There are ${proposals && proposals.length} proposals`}</p>
          <List
            component={ProposalsListItem}
            items={proposals}
          />
          <h3>Past proposals</h3>
          <p>Proposal n°1: Adopted. Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <p>Proposal n°2: Adopted. Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <p>Proposal n°3: Adopted. Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    txs: state.vote.txs,
    proposals: state.vote.proposals
  }
}
const mapDispatchToProps = dispatch => {
  return ({
    createProposal: (values) => dispatch({type: 'CREATE_PROPOSAL_REQUESTED', values}),
    //getAllProposals: () => dispatch({type: 'FETCH_ALL_PROPOSALS_REQUESTED'})  Triggered in saga bootstrap for now
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalSubmissionPage)