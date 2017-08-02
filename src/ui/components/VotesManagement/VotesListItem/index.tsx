import * as React from 'react'
import * as PropTypes from 'prop-types'

function VotesListItem(props) {
  return (
    <li>
      <div>
        <p>Voter's Address: {props.item.voterAddr}</p>
        <p>The Voter's vote: {props.item.voteValue}</p>
      </div>
    </li>
  )
}

VotesListItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.any,
}

export default VotesListItem