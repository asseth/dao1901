import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import convertTimestampToDate from '../../../helpers/convertTimestampToDate'

function ProposalsListItem(props) {
  return (
    <li styleName="item">
      <div styleName="itemContent">
        <p>Proposal ID: {props.index + 1}</p>
        <p>Description: {props.item.proposalDesc}</p>
        <p>Expiration date: {convertTimestampToDate(props.item.proposalDeadline)}</p>
      </div>
    </li>
  );
}

ProposalsListItem.propTypes = {
  styleName: PropTypes.string,
  item: PropTypes.any,
};

export default ProposalsListItem;
