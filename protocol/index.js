var Web3 = require('web3');


if (typeof web3 !== 'undefined') {
  window.web3 = new Web3(web3.currentProvider);
  console.log('web3.currentProvider', web3.currentProvider);
  console.log('web3', web3);
} else {
  window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

console.log('web3', web3, web3.currentProvider);

// cf http://truffleframework.com/docs/advanced/build_processes - BOOTSTRAPPING YOUR FRONTEND
var Dao1901Members = require("./build/contracts/Dao1901Members.sol.js");
Dao1901Members.setProvider(web3.currentProvider);
var Dao1901Votes = require("./build/contracts/Dao1901Votes.sol.js");
Dao1901Votes.setProvider(web3.currentProvider);
var Owned = require("./build/contracts/Owned.sol.js");
Owned.setProvider(web3.currentProvider);

// var web3 = web3.setProvider(new Web3.providers.HttpProvider("https://morden.infura.io:8545/"));
// web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

// var provider = new Web3.providers.HttpProvider("https://morden.infura.io:8545/");

//Dao1901Members.setNetwork(2); // Enforce morden

module.exports = {
  Owned: Owned.deployed(),
  Dao1901Members: Dao1901Members.deployed(),
  Dao1901Votes: Dao1901Votes.deployed()
};