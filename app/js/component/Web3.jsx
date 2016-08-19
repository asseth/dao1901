import React from 'react';
import { web3 } from '../../../contracts/Dao1901Members.sol';

export default function Web3() {
  return (
    <div className="Web3">
      <h2>Web3</h2>
      <dl>
        <dt>Connected Ethereum node (Web3 provider)</dt>
        <dd>{web3.currentProvider.host}</dd>
        <dt>Latest block</dt>
        <dd>{web3.eth.blockNumber}</dd>
        <dt>Accounts</dt>
        <dd>
          {web3.eth.accounts.map(
            (account, i) => <div key={account}>{i}: {account}</div>
          )}
        </dd>
      </dl>
    </div>
  );
}