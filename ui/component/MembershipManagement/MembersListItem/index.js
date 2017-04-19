import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import convertTimestampToDate from '../../../helpers/convertTimestampToDate';

/**
 * Member ListItem component
 * @param props
 * @returns {XML}
 * @constructor
 */
export default function MembersListItem(props) {
  return (
    <li>
      <div>
        <p>Member ID: {props.item.memberAddress}</p>
        <p>End subscription date: {convertTimestampToDate(props.item.endSubscriptionDate)}</p>
      </div>
    </li>
  );
}

MembersListItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.any,
};