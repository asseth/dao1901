import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import contracts from 'dao1901-contracts';
import Info from '../../component/Info';

/**
 * Home Page
 *
 * 	- Ethereum Account Info
 * 	- Ethereum Blockchain Info
 * 	- Project description
 */
class HomeContainer extends React.Component {
  render() {
    const {dao, ethereum, user, web3} = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Home</h2>
          </div>
        </div>

        <Info
          blockNumber={ethereum && ethereum.blockNumber}
          contractAddressMembers={ethereum && ethereum.contractAddressMembers}
          contractAddressOwner={ethereum && ethereum.contractAddressOwner}
          contractAddressVotes={ethereum && ethereum.contractAddressVote}
          currentProvider={web3 && web3.currentProvider && web3.currentProvider.host}
          //currentProvider={web3 && web3.currentProvider.host ? web3.currentProvider.host : web3.currentProvider.constructor.name} // fix metamask testnet
          defaultAccount={user && user.address}
          defaultAccountbalance={user && user.defaultAccountBalance}
          ownerAddress={dao && dao.owner}
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

export default connect(mapStateToProps)(HomeContainer);