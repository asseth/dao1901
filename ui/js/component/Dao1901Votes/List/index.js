import React from 'react';

import styles from './styles.css';

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
  component: React.PropTypes.func.isRequired,
  items: React.PropTypes.array,
};

export default List;
