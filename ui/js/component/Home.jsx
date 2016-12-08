import React from 'react';
import {Row, Well} from 'react-bootstrap';
//import {Owned, web3} from '../../../pcontracts/Owned.sol';

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
        <h2>Home</h2>
        <dl>
          <dt>Owner</dt>
          <dd>Owned.owner(): {this.state.owner} / balance: {this.state.balance}</dd>
        </dl>

        <Row>
          <Well>
            <p>{`hello ${'adress'}`}</p>
            <p>{`Your balance is: `}</p>
            <p>{`You are connected on: `}</p>
          </Well>
        </Row>

        <h2>What is Dao 1901 ?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
          dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora velit
          veritatis?
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
          dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora velit
          veritatis?
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
          dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora velit
          veritatis?
        </p>

        <h2>How does it works</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
          dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora velit
          veritatis?
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
          dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora velit
          veritatis?
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
          dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora velit
          veritatis?
        </p>

        <h2>Additional Infos</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
          dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora velit
          veritatis?
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
          dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora velit
          veritatis?
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
          dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora velit
          veritatis?
        </p>
      </div>
    );
  }
}
