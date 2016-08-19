import React from 'react';
import { Owned } from '../../../contracts/Owned.sol';

export default function Web3() {
  return (
    <div className="Dao1901Members">
      <h2>Owner</h2>
      <dl>
        <dt>Owner</dt>
        <dd>Owned.owner(): {Owned.owner()}</dd>
      </dl>
    </div>
  );
}
