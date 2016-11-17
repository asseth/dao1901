import React from 'react';

import styles from './styles.css';

let calculateDeadline = (timestamp) => {
  let diff = timestamp - Math.floor(Date.now() / 1000);
  let days = Math.floor(diff / 86400);
  // Total hours - days in hours
  let hours = Math.floor(diff / 3600) - (days * 24);
  // Total minutes - days and hours in minutes
  let minutes = Math.floor(diff / 60) - ((days * 24 * 60) + (hours * 60));
  return `${days} days - ${hours} hours - ${minutes} minutes`;
};

function ProposalsListItem(props) {
  return (
    <li className={props.className || styles.item}>
      <div className={styles.itemContent}>
        <p>Proposal ID: {props.index}</p>
        <p>Description: {props.item.proposalDesc}</p>
        <p>Days until deadline: {calculateDeadline(props.item.proposalDeadline)}</p>
      </div>
    </li>
  );
}

ProposalsListItem.propTypes = {
  className: React.PropTypes.string,
  item: React.PropTypes.any,
};

export default ProposalsListItem;
