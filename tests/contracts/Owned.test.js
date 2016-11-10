import {Owned, web3} from '../../contracts/Owned.sol';
const assert = require('chai').assert;
let alice, bob, carol;

function init() {
  // Give name to accounts
  alice = web3.eth.accounts[0];
  console.log('alice: ', alice);
  bob = web3.eth.accounts[1];
  console.log('bob: ', bob);
  carol = web3.eth.accounts[2];
  console.log('carol: ', carol);
}

describe('Owned', () => {
  before(() => {
    init();
  });

  it('should deploy contract', () => {
    console.log('Owned.address', Owned.address);
    assert(Owned.address, "contract is not deployed");
  });

  it.skip('should not be able to transfer DAO1901 ownership', () => {
    console.log('Non-owner tries to transfer ownership...', carol, Owned.owner());
    Owned.changeOwner.sendTransaction(carol, {from:carol});
    assert(Owned.owner() == alice, "non-owner was able to transfer ownership");
  });

  it('should transfer DAO1901 ownership', () => {
    console.log('Owner transfer ownership...');
    Owned.changeOwner.sendTransaction(bob, {from:alice});
    assert(Owned.owner() == bob, "ownership was not transfered to Bob");
  });
});
