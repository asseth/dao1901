import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
console.log('styles.itemContent', styles.itemContent)

function VotesListItem(props) {
  return (
    <li className={props.className || styles.item}>
      <div className={styles.itemContent}>
        <p>Voter's Address: {props.item.voterAddr}</p>
        <p>The Voter's vote: {props.item.voteValue}</p>
      </div>
    </li>
  );
}

VotesListItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.any,
};

export default VotesListItem;
