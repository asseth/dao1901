import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

/**
 * List
 * Can take different ListItem component
 * @param props
 * @returns {XML}
 * @constructor
 */
export default function List(props) {
  const ListItem = props.component;
  let content = (<div></div>);

  // If we have items, render them
  if (props.items && props.items.length !== 0) {
    content = props.items.map((item, index) => (
      <ListItem key={`item-${index}`} item={item} index={index} />
    ));
  } else {
    // Otherwise render a single component
    content = <p>{'No Content'}</p>;
  }

  return (
    <div styleName="listWrapper">
      <ul styleName="list">
        {content}
      </ul>
    </div>
  );
}

List.propTypes = {
  component: PropTypes.func.isRequired,
  items: PropTypes.array
};