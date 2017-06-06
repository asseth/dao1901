import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import {Card} from 'reactstrap';
import contracts from 'dao1901-contracts';
import Info from '../../component/Info'
let Owned;

/**
 * Home Page
 *
 * 	- Ethereum Account Info
 * 	- Ethereum Blockchain Info
 * 	- Project description
 */
class HomeContainer extends React.Component {
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
    try {
      Owned = await contracts.Owned.deployed();
      this.setState({owner: await Owned.owner()});
    }
    catch (err) {
      throw new Error(err.message);
    }

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

        <Info
          blockNumber={this.getBlockNumber}
          contractAddressMembers={this.getContractAddressMembers}
          contractAddressOwner={this.getContractAddressOwner}
          contractAddressVotes={this.getContractAddressVote}
          currentProvider={web3.currentProvider.host ? web3.currentProvider.host : web3.currentProvider.constructor.name}
          /*defaultAccount={userAddress}*/
          defaultAccountbalance={this.getDefaultAccountBalance}
          ownerAddress={this.getOwner}
        />

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

const mapStateToProps = (state, props) => {
  console.log('state', state); // state
  console.log('props',props); // ownProps
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {actions: bindActionCreators(attendanceRecordActions, dispatch)}
}

export default connect()(HomeContainer);