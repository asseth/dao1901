import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function ProposalsListItem(props) {
  return (
    <li className={props.className || styles.item}>
      <div className={styles.itemContent}>
        <p>Proposal ID: {props.index + 1}</p>
        <p>Description: {props.item.proposalDesc}</p>
        <p>Days until deadline: {calculateDeadline(props.item.proposalDeadline)}</p>
      </div>
    </li>
  );
}

ProposalsListItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.any,
};

export default ProposalsListItem;
