import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function VotesListItem(props) {
  return (
    <li styleName={props.className || "item"}>
      <div styleName="itemContent">
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
