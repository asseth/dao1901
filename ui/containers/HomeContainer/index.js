import React from 'react'
import {connect} from 'react-redux'
import './styles.scss'
import Info from '../../components/common/Info'

/**
 * Home Page
 *
 *  - Ethereum Account Info
 *  - Ethereum Blockchain Info
 *  - Project description
 */
let HomePage = (props) => {
  const {
          contractAddressMembers,
          contractAddressVotes,
          contractAddressOwned,
          dao,
          ethereum,
          user
        } = props

  const {currentProvider: {host = null, constructor: {name = null} = {}} = {}} = window.web3 || {};

  return (
    <div id="home-page">
      <div className="row">
        <div className="col">
          <h2>Home</h2>
        </div>
      </div>

      <Info
        defaultAccount={user && user.defaultAccount}
        balance={user && user.balance}
        blockNumber={ethereum && ethereum.blockNumber}
        currentProvider={host || name} // do this check in case of Metamask
        contractAddressMembers={contractAddressMembers}
        contractAddressOwned={contractAddressOwned}
        contractAddressVotes={contractAddressVotes}
        isWeb3Connected={!!window.web3}
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
  )
}
const mapStateToProps = (state) => {
  return {
    contractAddressMembers: state.dao.contracts && state.dao.contracts.Dao1901Members.address,
    contractAddressVotes: state.dao.contracts && state.dao.contracts.Dao1901Votes.address,
    contractAddressOwned: state.dao.contracts && state.dao.contracts.Owned.address,
    dao: state.dao,
    ethereum: state.ethereum,
    user: state.user,
  }
}
export default connect(mapStateToProps)(HomePage)