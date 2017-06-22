import React from 'react'
//import PropTypes from 'prop-types'
import './styles.scss'
import {Card} from 'reactstrap'
import {Icon} from 'react-fa'

/**
 * Display basic info about user, blockchain status, ...
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
export default function Info (props) {
  return (
    <div className="row">
      <div className="col">
        <Card className="mx-auto" styleName="info">
          <h4>User Info</h4>
          <p>{'User account: '}<span className="ethereum-address">{props.defaultAccount}</span></p>
          <p>
            Balance: {props.balance
              ? `${props.balance} ETH`
              : 'Unknown'}
            </p>
          <h4>Ethereum Blockchain Info</h4>
          <p>{`Web3 status: ${props.isWeb3Connected ? "connected" : "not connected"}`}</p>
          <p>{`Current web3 provider host: ${props.currentProvider}`}</p>
          <p>{`Block number: ${props.blockNumber}`}</p>
          <h4>DAO Info</h4>
          <p>{props.ownerAddress === props.defaultAccount ? 'You are the owner'
            : `You are not the owner. Owner: ${props.ownerAddress ? props.ownerAddress : 'Unknown'}`}</p>
          <p>
            Owned contract address: {props.contractAddressOwned
              ? props.contractAddressOwned
              : <span><Icon name="warning"/> {'Contract not deployed or unreachable'}</span>}
          </p>
          <p>
            Members contract address: {props.contractAddressMembers
            ? props.contractAddressMembers
            : <span><Icon name="warning"/> {'Contract not deployed or unreachable'}</span>}
          </p>
          <p>
            Votes contract address: {props.contractAddressVotes
            ? props.contractAddressVotes
            : <span><Icon name="warning"/> {'Contract not deployed or unreachable'}</span>}
          </p>
        </Card>
      </div>
    </div>
  )
}
