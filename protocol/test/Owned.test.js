const Owned = artifacts.require('Owned')
let expectThrow = require('../helpers/expectThrow.js')
let alice, bob, carol;
// let itClean = (title, itCb) => contract(title, () => it(title, itCb))

let owned = null;

contract('Owned', (accounts) => {
  before(async () => {
    owned = await Owned.deployed()
    alice = accounts[0];
    console.log('alice: ', alice);
    bob = accounts[1];
    console.log('bob: ', bob);
    carol = accounts[2];
    console.log('carol: ', carol);
  })

  it('should have an address property', () => {
    assert(owned.address, "contract is not deployed")
  })

  it('should not be able to transfer DAO1901 ownership', async () => {
    await expectThrow(owned.changeOwner.sendTransaction(carol, {from: carol}))
  })

  it('should transfer DAO1901 ownership', async () => {
    const tx = await owned.changeOwner.sendTransaction(bob, {from: alice, gas: 200000})
    assert(tx, 'tx')
    assert.equal(await owned.owner(), bob, "ownership was not transfered to Bob")
    await expectThrow(owned.changeOwner.sendTransaction(bob, {from: alice}))
  })
})