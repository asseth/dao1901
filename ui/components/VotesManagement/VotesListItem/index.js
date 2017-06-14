import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function VotesListItem(props) {
  return (
    <li className={props.className || styles.item}>
      <div className={styles.itemContent}>
        {/*<p>Vote n°: {props.index + 1}</p>*/}
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
