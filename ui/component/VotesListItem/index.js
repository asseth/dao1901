import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function ProposalsListItem(props) {
  return (
    <li className={props.className || styles.item}>
      <div className={styles.itemContent}>
        <p>Vote n°: {props.index + 1}</p>
        <p>Voter's Address: {props.item.voterAddr}</p>
        <p>Proposal ID he voted for: {props.item.proposalId}</p>
        <p>The Voter's vote: {props.item.voteValue}</p>
      </div>
    </li>
  );
}

ProposalsListItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.any,
};

export default ProposalsListItem;
