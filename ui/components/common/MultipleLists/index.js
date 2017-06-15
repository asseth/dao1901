import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'

export default function MultipleLists (props) {
  const ListItem = props.component
  let list = []
  let lists = []

  let renderList = (proposalID) => {
    return (
      <div key={`list-${proposalID}`}>
        <h3>{`Proposal n° ${proposalID}`}</h3>
        <ul className={styles.list}>
          {list}
        </ul>
      </div>
    )
  }

  if (props.items && Object.keys(props.items).length !== 0) {
    for (var proposalID in props.items) {
      if (props.items.hasOwnProperty(proposalID)) {
        list = props.items[proposalID].map((item, index) => (
          <ListItem key={`item-${index}`} item={item} />
        ))
        lists.push(renderList(proposalID))
      }
    }
  } else {
    lists = <p>{'No Content'}</p>
  }

  return (
    <div className={styles.listWrapper}>
      {lists}
    </div>
  )
}

MultipleLists.propTypes = {
  component: PropTypes.func.isRequired,
  items: PropTypes.object,
}