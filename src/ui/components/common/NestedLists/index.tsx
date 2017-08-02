import * as React from 'react'
import {Component} from 'react'
import * as PropTypes from 'prop-types'
import styles from './styles.css'
import VoteListItem from '../../VotesManagement/VotesListItem'

export default function NestedLists (props) {
  const {items} = props
  let list = []
  let lists = []

  let renderList = (proposalID) => {
    return (
      <div key={`list-${proposalID}`} className={styles.list}>
        <h3>{`Proposal n° ${proposalID}`}</h3>
        <ul>
          {list}
        </ul>
      </div>
    )
  }

  if (items && Object.keys(items).length !== 0) {
    for (var proposalID in items) {
      if (items[proposalID].length) {
        if (items.hasOwnProperty(proposalID)) {
          list = items[proposalID].map((item, index) => (
            <VoteListItem key={`item-${index}`} item={item} />
          ))
          lists.push(renderList(proposalID))
        }
      } else {
        list = <li>{'No votes yet'}</li>
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