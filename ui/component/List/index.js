import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function List(props) {
  const ListItem = props.component;
  let content = (<div></div>);

  // If we have items, render them
  if (props.items.length !== 0) {
    content = props.items.map((item, index) => (
      <ListItem key={`item-${index}`} item={item} index={index} />
    ));
  } else {
    // Otherwise render a single component
    content = <p>{'No Content'}</p>;
  }

  return (
    <div className={styles.listWrapper}>
      <ul className={styles.list}>
        {content}
      </ul>
    </div>
  );
}

List.propTypes = {
  component: PropTypes.func.isRequired,
  items: PropTypes.array
};

export default List;
