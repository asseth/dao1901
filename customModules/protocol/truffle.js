require('dotenv').config({path: '../../.env'})
const isTestnet = process.env.NETWORK === 'testnet' ? true : false
let address, engine

if (isTestnet) {
  const { MNEMONIC } = process.env
  if (!MNEMONIC) throw new Error('You must export MNEMONIC (see truffle.js)')

  const bip39 = require("bip39")
  const hdkey = require('ethereumjs-wallet/hdkey')
  const ProviderEngine = require("web3-provider-engine")
  const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js')
  const WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js')
  const Web3Subprovider = require("web3-provider-engine/subproviders/web3.js")
  const Web3 = require("web3")

  // Get our mnemonic and create an hdwallet
  let mnemonic = MNEMONIC
  let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic))

  // Get the first account using the standard hd path.
  let wallet_hdpath = "m/44'/60'/0'/0/"
  let wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet()
  address = "0x" + wallet.getAddress().toString("hex")
  let providerUrl = "https://kovan.infura.io"
  engine = new ProviderEngine()
  engine.addProvider(new FilterSubprovider())
  engine.addProvider(new WalletSubprovider(wallet, {}))
  engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)))
  engine.start() // Required by the provider engine.
}

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
    },
    kovan: {
      from: isTestnet ? address : null, // Use the address we derived
      gas:4900000,
      network_id: '42',
      provider: isTestnet ? engine : null, // Use our custom provider
    }
  },
  mocha: {
    timeout: 200000,
    useColors: true
  }
}