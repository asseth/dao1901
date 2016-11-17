import React from 'react';

function ProposalsListItem(props) {
  return (
    <li className={props.className || styles.item}>
      <div className={styles.itemContent}>
        <p>Vote ID: {props.index}</p>
        <p>Voter's Address: {props.item}</p>
        <p>Proposal ID he voted for: {props.item}</p>
        <p>The Voter's vote: {}</p>
      </div>
    </li>
  );
}

ProposalsListItem.propTypes = {
  className: React.PropTypes.string,
  item: React.PropTypes.any,
};

export default ProposalsListItem;
