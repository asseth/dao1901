import React from 'react';
import './styles.scss';
import contracts from 'dao1901-contracts';
let Owned, Dao1901Members, Dao1901Votes;

/**
 * Useful info
 *
 *  - User Info
 *  - Ethereum Blockchain Info
 */
export default class Info extends React.Component {
  constructor() {
    super();
    this.state = {
      currentProvider: '',
      defaultAccountBalance: '',
      eth_blockNumber: '',
      owner: ''
    };
  }

  async componentWillMount() {
    //console.log('uiuiuiui', this.getBlockNumber());
  }

  async getBlockNumber() {
    return await web3.eth.getBlockNumber((e, r) => {
      if (e) throw new Error(e.message);
      return r
    });
  }

  async getDefaultAccountBalance() {
    return web3.fromWei(await web3.eth.getBalance(web3.eth.defaultAccount, "ether").toString());
  }

  async getOwner() {
    return await Owned.owner()
  }

  async getcontractAddressMembers() {
    try {
      return await contracts.Dao1901Members.deployed();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getcontractAddressOwner() {
    try {
      return await contracts.Owned.deployed();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getcontractAddressVote() {
    try {
      return await contracts.Dao1901Votes.deployed();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  render() {
    return (
      <div>

        <Info
          blockNumber={this.getBlockNumber}
          contractAddressMembers={this.getcontractAddressMembers}
          contractAddressOwner={this.getcontractAddressOwner}
          contractAddressVotes={this.getcontractAddressVote}
          {/*Metamask on Testnet does not have "web3.currentProvider.host"*/}
          currentProvider={web3.currentProvider.host ? web3.currentProvider.host : web3.currentProvider.constructor.name}
          defaultAccount={web3.eth.defaultAccount}
          defaultAccountbalance={this.getDefaultAccountBalance}
          ownerAddress={this.getOwner}
        />
      </div>
    )
  }
}