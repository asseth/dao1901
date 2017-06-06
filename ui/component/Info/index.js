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
          <p>{'Account: '}<span className="ethereum-address">{props.defaultAccount}</span></p>
          <p>{`Balance: ${props.defaultAccountBalance} ETH`}</p>
          <p>{props.ownerAddress === props.defaultAccount ? 'You are the owner, you are the boss.'
            : `You are not the owner. Owner is: ${props.ownerAddress}`}</p>
          <h4>Ethereum Blockchain Info</h4>
          <p>{`Current web3 provider host is: ${props.currentProvider}`}</p>
          <p>{`We are on block number ${props.blockNumber}`}</p>
          <p>
            <span className="text-primary">{'Owned'}</span>
            {`Ethereum smart-contract Owner address: ${props.ownerAddress}`}
          </p>
          <p>
            <span className="text-primary">{'Dao1901Members'}</span>
            {`Ethereum smart-contract Members address: ${props.contractAddressMembers}`}
          </p>
        </Card>
      </div>
    </div>
  )
}
