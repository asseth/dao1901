import React from 'react';
//import PropTypes from 'prop-types';
//import styles from './styles.scss';
import {Card} from 'reactstrap';

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
        <Card className="home-info mx-auto">
          <h4>User Info</h4>
          <p>{'User account: '}<span className="ethereum-address">{props.defaultAccount}</span></p>
          <p>{`Balance: ${props.balance} ETH`}</p>
          <p>{props.ownerAddress === props.defaultAccount ? 'You are the owner'
            : `You are not the owner. Owner: ${props.ownerAddress}`}</p>
          <h4>Ethereum Blockchain Info</h4>
          <p>{`Current web3 provider host: ${props.currentProvider}`}</p>
          <p>{`Block number: ${props.blockNumber}`}</p>
          <p>
            {`Owner contract address: ${props.ownerAddress}`}
          </p>
          <p>
            {`Members contract address: ${props.contractAddressMembers}`}
          </p>
        </Card>
      </div>
    </div>
  )
}
