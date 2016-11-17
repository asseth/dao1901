import React from 'react';
import {Owned, web3} from '../../../contracts/Owned.sol';

export default class Web3 extends React.Component {
  constructor() {
    super();
    this.state = {
      owner: '',
      balance: ''
    };
    this.changeOwner = this.changeOwner.bind(this);
  }

  componentWillMount() {
    Owned.owner((e, r) => {
      this.setState({owner: r},
        // Get owner (msg.sender) balance
        () => {
          if (this.state.owner !== '0x') {
            web3.eth.getBalance(this.state.owner, (e, r) => {
              this.setState({balance: !e ? web3.fromWei(r, "ether").toString() : e.message})
            })
          }
        }
      )
    });
  }

  changeOwner(currentOwner, newOwner) {
    Owned.changeOwner.sendTransaction(newOwner, {from: currentOwner, gas: 200000}, (e, r) => {
      console.log(e, r);
    })
  }

  render() {
    //this.changeOwner('0x510b2077742d93ecc1b49602b444345344cd963d', '0x0e9d841a8c99c362b2746f6fc273e0d1f29bd830');
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
