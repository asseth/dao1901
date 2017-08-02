import React from 'react'
import * as PropTypes from 'prop-types'
import styles from './styles.css'
import convertTimestampToDate from '../../../helpers/convertTimestampToDate'

function ProposalsListItem(props) {
  return (
    <li className={styles.item}>
      <div>
        <p>Proposal #{props.index + 1}</p>
        <p>Description: {props.item.proposalDesc}</p>
        <p>Expiration date: {convertTimestampToDate(props.item.proposalDeadline)}</p>
      </div>
    </li>
  )
}

ProposalsListItem.propTypes = {
    index: PropTypes.number,
    item: PropTypes.any
}

export default ProposalsListItem