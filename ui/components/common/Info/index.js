import React from 'react'
//import PropTypes from 'prop-types'
import './styles.scss'
import {Card} from 'reactstrap'

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
          <p>{`Balance: ${props.balance} ETH`}</p>
          <h4>Ethereum Blockchain Info</h4>
          <p>{`Web3 status: ${props.isWeb3Connected ? "connected" : "not connected"}`}</p>
          <p>{`Current web3 provider host: ${props.currentProvider}`}</p>
          <p>{`Block number: ${props.blockNumber}`}</p>
          <h4>DAO Infos</h4>
          <p>{props.ownerAddress === props.defaultAccount ? 'You are the owner'
            : `You are not the owner. Owner: ${props.ownerAddress}`}</p>
          <p>
            {`Owned contract address: ${props.contractAddressOwned}`}
          </p>
          <p>
            {`Members contract address: ${props.contractAddressMembers}`}
          </p>
          <p>
            {`Votes contract address: ${props.contractAddressVotes}`}
          </p>
        </Card>
      </div>
    </div>
  )
}
