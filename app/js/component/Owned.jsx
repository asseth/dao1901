import React from 'react';
import {Owned, web3} from '../../../contracts/Owned.sol';

export default class Web3 extends React.Component {
  constructor() {
    super();
    this.state = {
      owner: '',
      balance: ''
    }
  }

  componentWillMount() {
    Owned.owner((e, r) => {
      this.setState({owner: r},
        // Get owner (msg.sender) balance
        () => {
          if (this.state.owner !== '0x') {
            web3.eth.getBalance(this.state.owner, (e, r) => {
              this.setState({balance: !e ? r.toString() : e.message})
            })
          }
        }
      )
    });
  }

  render() {
    return (
      <div className="Dao1901Members">
        <h2>Owner</h2>
        <dl>
          <dt>Owner</dt>
          <dd>Owned.owner(): {this.state.owner} / balance: {this.state.balance}</dd>
        </dl>
      </div>
    );
  }
}
