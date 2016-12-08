// This simple library abstracts out all of Ethereum, using
// Infura to get network data, making this very accessible
// to other JS projects.

var Dao1901Members = require("./build/contracts/Dao1901Members.sol.js");
var Dao1901Votes = require("./build/contracts/Dao1901Votes.sol.js");
var Owned = require("./build/contracts/Owned.sol.js");

// var web3 = web3.setProvider(new Web3.providers.HttpProvider("https://morden.infura.io:8545/"));
var web3 = new Web3(new Web3.providers.HttpProvider("https://localhost:8545/"));

// var provider = new Web3.providers.HttpProvider("https://morden.infura.io:8545/");
/*
 if(typeof web3 !== 'undefined') {
 web3 = new Web3(web3.currentProvider);
 console.log('web3.currentProvider', web3.currentProvider);
 console.log('web3', web3);
 } else {
 web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 }
 */

//Dao1901Members.setNetwork(2); // Enforce morden

module.exports = {
  Owned: Owned.deployed(),
  Dao1901Members: Dao1901Members.deployed(),
  Dao1901Votes: Dao1901Votes.deployed(),
  web3: web3
};