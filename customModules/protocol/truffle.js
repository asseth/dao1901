require('dotenv').config({path: '../../.env'})
const LightWalletProvider = require('@digix/truffle-lightwallet-provider')
const { KEYSTORE, PASSWORD } = process.env
if (!KEYSTORE || !PASSWORD) { throw new Error('You must export KEYSTORE and PASSWORD (see truffle.js)') }

module.exports = {
  networks: {
    development: {
      provider: new LightWalletProvider({
        keystore: KEYSTORE,
        password: PASSWORD,
        rpcUrl: 'http://localhost:8545/',
        debug: true, // optional, show JSON-RPC logs
        prefund: 1e18, // optional, fund all lightwallet addresses (via coinbase) with this  of wei
        pollingInterval: 500 // optional, polling interval for the provider (reduce for faster deploy with testRPC or kovan)
      }),
      network_id: '*'
    },
    kovan: {
      provider: new LightWalletProvider({
        keystore: KEYSTORE,
        password: PASSWORD,
        rpcUrl: 'https://kovan.infura.io/',
        pollingInterval: 2000, // optional, polling interval for the provider (reduce for faster deploy with testRPC or kovan)
        debug: false
      }),
      gas: 4600000,
      network_id: '42',
    },
    ropsten: {
      provider: new LightWalletProvider({
        keystore: KEYSTORE,
        password: PASSWORD,
        rpcUrl: 'https://ropsten.infura.io/',
        pollingInterval: 4000 // optional, polling interval for the provider (reduce for faster deploy with testRPC or kovan)
      }),
      network_id: '3',
    },
    mainnet: {
      provider: new LightWalletProvider({
        keystore: KEYSTORE,
        password: PASSWORD,
        rpcUrl: 'https://mainnet.infura.io/'
      }),
      network_id: '1',
    },
  },
  mocha: {
    timeout: 200000,
    useColors: true
  }
}