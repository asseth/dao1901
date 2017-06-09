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
    const {
      contractAddressMembers,
      contractAddressVotes,
      contractAddressOwned,
      dao,
      ethereum,
      user,
      web3
    } = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Home</h2>
          </div>
        </div>

        <Info
          defaultAccount={user && user.defaultAccount}
          balance={user && user.balance}
          blockNumber={ethereum && ethereum.blockNumber}
          currentProvider={web3 && web3.currentProvider && web3.currentProvider.host}
          //currentProvider={web3 && web3.currentProvider.host ? web3.currentProvider.host : web3.currentProvider.constructor.name} // fix metamask testnet
          contractAddressMembers={contractAddressMembers}
          contractAddressOwned={contractAddressOwned}
          contractAddressVotes={contractAddressVotes}
          ownerAddress={dao && dao.ownerAddress}
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
    contractAddressMembers: state.dao && state.dao.contract && state.dao.contract.Dao1901Members.address,
    contractAddressVotes: state.dao && state.dao.contract && state.dao.contract.Dao1901Votes.address,
    contractAddressOwned: state.dao && state.dao.contract && state.dao.contract.Owned.address,
    dao: state.dao,
    ethereum: state.ethereum,
    isConnected: state.web3Wrap.isConnected,
    user: state.user,
    web3: state.web3Wrap.web3
  }
}

export default connect(mapStateToProps)(HomeContainer);