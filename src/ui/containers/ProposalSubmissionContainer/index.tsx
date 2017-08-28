import * as React from "react"
import {Component} from 'react'
import {connect} from 'react-redux'
import toastrManager from '../../helpers/toastrManager'
import List from '../../components/common/List'
import ProposalSubmissionForm from '../../components/VotesManagement/ProposalSubmissionForm/index'
import ProposalsListItem from '../../components/VotesManagement/ProposalsListItem'
// ========================================================
// Proposal Submission
// ========================================================
class ProposalSubmissionPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    toastrManager(nextProps, this.props)
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
    errors: state.vote.errors,
    txs: state.vote.txs,
    proposals: state.vote.proposals
  }
}
const mapDispatchToProps = dispatch => {
  return ({
    createProposal: (values) => dispatch({type: 'TX_CREATE_PROPOSAL_REQUESTED', values}),
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(ProposalSubmissionPage)