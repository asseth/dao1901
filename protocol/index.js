import { default as contract } from 'truffle-contract';
import Web3 from 'web3';
import 'babel-polyfill';

if (typeof web3 !== 'undefined') {
  window.web3 = new Web3(web3.currentProvider);
  console.log('web3.currentProvider', web3.currentProvider);
  console.log('web3', web3);
} else {
  window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  console.log(`web3 is set globally. Current provider host is: ${web3.currentProvider.host}`);
}

// let web3 = web3.setProvider(new Web3.providers.HttpProvider("https://morden.infura.io:8545/"));
// web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
// let provider = new Web3.providers.HttpProvider("https://morden.infura.io:8545/");
//Dao1901Members.setNetwork(2); // Enforce morden

// TODO Can we use artifacts.require, injected by truffle ?
//let Dao1901Members = artifacts.require("Dao1901Members");
//let Dao1901Votes = artifacts.require("Dao1901Votes");
//let Owned = artifacts.require("Owned");


const Dao1901Members = contract(require('./build/contracts/Dao1901Members.json'));
Dao1901Members.setProvider(web3.currentProvider);

const Dao1901Votes = contract(require('./build/contracts/Dao1901Votes.json'));
Dao1901Votes.setProvider(web3.currentProvider);

const Owned = contract(require('./build/contracts/Owned.json'));
Owned.setProvider(web3.currentProvider);

export default {
  Owned: Owned,
  Dao1901Members: Dao1901Members,
  Dao1901Votes: Dao1901Votes
}