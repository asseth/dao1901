import React from 'react';
import './styles.scss';
import {Card} from 'reactstrap';
import contracts from 'dao1901-contracts';
let Owned;

/**
 * Home Page
 *
 * 	- Ethereum Account Info
 * 	- Ethereum Blockchain Info
 * 	- Project description
 */
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      currentProvider_host: '',
      defaultAccountBalance: '',
      eth_blockNumber: '',
      owner: ''
    };
  }

  async componentWillMount() {
    // Get Owned instance
    Owned = await contracts.Owned.deployed();
    this.setState({owner: await Owned.owner()});

    // Set currentProvider_host
    if (web3.currentProvider.host) {
      this.setState({currentProvider_host: web3.currentProvider.host})
    }
    // Metamask on Testnet does not have "web3.currentProvider.host"
    else {
      this.setState({currentProvider_host: web3.currentProvider.constructor.name});
    }

    // Set block number
    web3.eth.getBlockNumber((e, r) => this.setState({eth_blockNumber: !e ? r : e.message}));

    // Set defaultAccountBalance
    web3.eth.getBalance(web3.eth.defaultAccount, (err, balance) => {
      if (err) throw new Error(err.message);
      this.setState({defaultAccountBalance: web3.fromWei(balance, "ether").toString()});
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Home</h2>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Card className="home-info mx-auto">
              <p>{'Hello '}<span className="ethereum-address">{web3.eth.defaultAccount}</span>{' !'}</p>
              <p>{`You have ${this.state.defaultAccountBalance} ethers, nice job mate ;-)`}</p>
              <p>{this.state.owner === this.state.defaultAccount ? 'You are the owner, you are the boss.'
                : `You are not the owner. It is ${this.state.owner}`}</p>
              <h4>Ethereum Blockchain Info</h4>
              <p>{`Current web3 provider host is: ${web3.currentProvider.host}`}</p>
              <p>{`We are on block number ${this.state.eth_blockNumber}`}</p>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h2>What is Dao 1901 ?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
              dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
              velit
              veritatis?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
              dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
              velit
              veritatis?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
              dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
              velit
              veritatis?
            </p>
          </div>

          <div className="col">
            <h2>How does it works</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
              dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
              velit
              veritatis?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
              dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
              velit
              veritatis?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
              dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
              velit
              veritatis?
            </p>
          </div>

          <div className="col">
            <h2>Additional Infos</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
              dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
              velit
              veritatis?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
              dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
              velit
              veritatis?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aperiam beatae commodi dicta
              dolorem earum et hic ipsam ipsum, molestiae nulla porro quasi reiciendis, repellendus suscipit tempora
              velit
              veritatis?
            </p>
          </div>
        </div>
      </div>
    );
  }
}
