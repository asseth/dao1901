import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
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
      defaultAccountBalance: '',
      eth_blockNumber: '',
      owner: ''
    };
  }

  async componentWillMount() {
     // Get Owned instance
    try {
      contracts.Owned.setProvider(this.props.web3.currentProvider);
      Owned = await contracts.Owned.deployed();
      this.setState({owner: await Owned.owner()});
    }
    catch (err) {
      throw new Error(err.message);
    }
  }

  render() {
    const {dao, ethereum, web3} = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Home</h2>
          </div>
        </div>

        <Info
          blockNumber={ethereum.blockNumber}
          contractAddressMembers={ethereum.contractAddressMembers}
          contractAddressOwner={ethereum.contractAddressOwner}
          contractAddressVotes={ethereum.contractAddressVote}
          currentProvider={web3.currentProvider.host ? web3.currentProvider.host : web3.currentProvider.constructor.name}
          defaultAccount={user.address}
          defaultAccountbalance={user.defaultAccountBalance}
          ownerAddress={dao.owner}
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

const mapStateToProps = (state) => {
  return {
    ethereum: state.ethereum,
    isConnected: state.web3Wrap.isConnected,
    web3: state.web3Wrap.web3
  }
}

const mapDispatchToProps = (dispatch) => {
  return {actions: bindActionCreators(Actions, dispatch)}
}

export default connect(mapStateToProps)(HomeContainer);