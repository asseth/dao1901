// This is a bit unruly, and needs to be put in its own package.
// But all this preamble tells Truffle how to sign transactions on
// its own from a bip39 mnemonic (which creates addresses and private keys).
// This allows Truffle deployment to work with infura. Note we do
// this specifically when deploying to the morden network.

/*
var hdkey = require('ethereumjs-wallet/hdkey');
var bip39 = require("bip39");
var ProviderEngine = require("web3-provider-engine");
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");
var fs = require("fs");
var path = require("path");

// Read the mnemonic from a file that's not committed to github, for security.
var mnemonic = fs.readFileSync(path.join(__dirname, "deploy_mnemonic.key"), {encoding: "utf8"}).trim();

var wallet_hdpath = "m/44'/60'/0'/0/";
var hd = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));

// Get the first account
var account = hd.derivePath(wallet_hdpath + "0")
var wallet = account.getWallet();
var address = "0x" + wallet.getAddress().toString("hex");

//var providerUrl = "https://morden.infura.io:8545";
var providerUrl = "http://localhost:8545";

var engine = new ProviderEngine();
engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
engine.start(engine);
*/

module.exports = {
  networks: {
    "live": {
      network_id: 1, // Ethereum public network
      // optional config values
      // host - defaults to "localhost"
      // port - defaults to 8545
      // gas
      // gasPrice
      // from - default address to use for any transaction Truffle makes during migrations
    },
    "morden": {
      network_id: 2,        // Official Ethereum test network
      host: "178.25.19.88", // Random IP for example purposes (do not use)
      port: 80
    },
    "staging": {
      network_id: 1337 // custom private network
      // use default rpc settings
    },
    "dev": {
      network_id: "default"
    }
  },
  build: {
    "index.html": "../ui/build/index.html",
    "app.js": [
      "../ui/build/js/bundle.js"
    ],
    "app.css": [
      "../ui/build/stylesheets.css"
    ],
    "images/": "../ui/build/images/"
  },
  migrations: './migrations',
  // Default configuration
  rpc: {
    host: "localhost",
    port: 8545
  }
};