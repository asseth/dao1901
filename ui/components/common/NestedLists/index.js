import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'
import VoteListItem from '../../VotesManagement/VotesListItem'

export default function NestedLists (props) {
  const {items} = props
  let list = []
  let lists = []

  console.log('styles-----------------------------', styles)

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

  if (items && Object.keys(items).length !== 0) {
    for (var proposalID in items) {
      if (items.hasOwnProperty(proposalID)) {
        list = items[proposalID].map((item, index) => (
          <VoteListItem key={`item-${index}`} item={item} />
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

NestedLists.propTypes = {
  items: PropTypes.object,
}