import React from 'react';
import {web3} from '../../../contracts/Dao1901Members.sol';

export default class Web3 extends React.Component {
  constructor() {
    super();
    this.state = {
      currentProvider_host: '',
      net_isListening: '',
      net_peerCount: '',
      eth_blockNumber: '',
      version_api: '',
      version_getEthereum: '',
      version_getNetwork: '',
      version_getNode: '',
      version_getWhisper: ''
    }
  }

  componentWillMount() {
    console.log(web3);
    if (web3.currentProvider.host) {
      this.setState({currentProvider_host: web3.currentProvider.host})
    }
    // Metamask on Testnet does not have "web3.currentProvider.host"
    else {
      this.setState({currentProvider_host: web3.currentProvider.constructor.name});
    }

    web3.net.getListening((e, r) => {
      this.setState({net_isListening: !e ? r.toString() : e.message})
    });

    web3.net.getPeerCount((e, r) => {
      this.setState({net_peerCount: !e ? r : e.message})
    });

    web3.eth.getBlockNumber((e, r) => {
      this.setState({eth_blockNumber: !e ? r : e.message})
    });

    // Version
    this.setState({version_api: web3.version.api});

    web3.version.getEthereum((e, r) => {
      this.setState({version_getEthereum: !e ? r : e.message})
    });
    web3.version.getNetwork((e, r) => {
      this.setState({version_getNetwork: !e ? r : e.message})
    });
    web3.version.getNode((e, r) => {
      this.setState({version_getNode: !e ? r : e.message})
    });
    web3.version.getWhisper((e, r) => {
      this.setState({version_getWhisper: !e ? r : e.message})
    });
  }

  render() {
    return (
      <div className="Web3">
        <h2>Web3 Inspection - for dev purposes</h2>
        <h3>Connected Ethereum node (Web3 provider)</h3>
        <p>web3.currentProvider.host: {this.state.currentProvider_host}</p>

        <h3>Version</h3>
        <p>web3.version.api: {this.state.version_api}</p>
        <p>web3.version.getEthereum: {this.state.version_getEthereum}</p>
        <p>web3.version.getNetwork: {this.state.version_getNetwork}</p>
        <p>web3.version.getNode: {this.state.version_getNode}</p>
        <p>web3.version.getWhisper: {this.state.version_getWhisper}</p>

        <h3>Net</h3>
        <p>web3.net.getListening: {this.state.net_isListening}</p>
        <p>web3.net.getPeerCount: {this.state.net_peerCount}</p>

        <h3>Eth</h3>
        <p>web3.eth.getBlockNumber: {this.state.eth_blockNumber}</p>
        <h3>Accounts - web3.eth.accounts</h3>
        <div>
          {web3.eth.accounts.map(
            (account, i) => <div key={account}>{i}: {account}</div>
          )}
        </div>
      </div>
    );
  }
}
