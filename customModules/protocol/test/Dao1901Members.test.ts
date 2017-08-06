import {expectThrow} from '../helpers/index'
import * as assert from 'assert'
const Dao1901MembersAbstraction = artifacts.require('Dao1901Members')
const Dao1901VotesAbstraction = artifacts.require('Dao1901Votes')
let Dao1901Members, Dao1901Votes
let alice, bob, carol
let itClean = (title, itCb) => contract(title, () => it(title, itCb))

// Retrieve the current list of members
async function memberList(daoMembers) {
  let members = []
  let addr = await daoMembers.head()
  while (addr != 0) {
    if (await daoMembers.isMember.call(addr)) {
      members.push(addr)
    }
    let sub = await daoMembers.subscriptions(addr)
    addr = sub[1]
  }
  return members
}

contract('Dao1901Members', (accounts) => {
  before(async () => {
    Dao1901Members = await Dao1901MembersAbstraction.deployed()
    Dao1901Votes = await Dao1901VotesAbstraction.deployed()
    alice = accounts[0]
    console.log('alice: ', alice)
    bob = accounts[1]
    console.log('bob: ', bob)
    carol = accounts[2]
    console.log('carol: ', carol)
  })

  contract('initialization phase', () => {
    it('should deploy contract', () => {
      assert(Dao1901Members.address, "contract is not deployed")
    })

    it('should have Alice as owner', async () => {
      assert.equal(await Dao1901Members.owner(), alice, "first owner is not contract creator")
    })

    it('should have members list head correctly initialized to 0x0', async () => {
      assert.equal(await Dao1901Members.head(), 0x0, "members list head is not correctly initialized")
    })
  })

  contract('Member Management', () => {
    it('should not have Bob as a member if not added', async () => {
      assert(!(await Dao1901Members.isMember(bob)), "Bob is a DAO member before subscribing")
    })

    it('should owner add Bob as a member for 1 year', async () => {
      // subscribe account 1 for 1 year
      const tx = await Dao1901Members.subscribe.sendTransaction(bob, 1, {from: alice})
      assert(tx, 'tx not present')
      assert(await Dao1901Members.isMember(bob), "Bob is not a DAO member after subscribing")
    })

    it('should have owner able to revoke a member', async () => {
      await Dao1901Members.subscribe.sendTransaction(bob, -1, {from: alice}) // Subscription ends now
      assert(!(await Dao1901Members.isMember(bob)), "Bob is still a member after revokation")
    })

    it('should renew bob and add carol', async () => {
      await Dao1901Members.subscribe.sendTransaction(bob, 1, {from:alice}) // renew subscription
      await Dao1901Members.subscribe.sendTransaction(carol, 1, {from:alice}) // add account 2
      assert(await Dao1901Members.isMember(bob), "Bob is not a DAO member after renewal")
      assert(await Dao1901Members.isMember(carol), "Carol is not a DAO member after subscribing")
    })

    it('should retrieve the list of members', async () => {
      let members = await memberList(Dao1901Members)
      assert.equal(members.length, 2, "Dao should have 2 members")
      assert(members.indexOf(bob) !== -1, "Bob should be a member")
      assert(members.indexOf(carol) !== -1, "Carol should be a member")
    })

    it('should revoke head (the last added member) and retrieve list', async () => {
      await Dao1901Members.subscribe.sendTransaction(await Dao1901Members.head(), -1, {from: alice})
      let members = await memberList(Dao1901Members)
      assert.equal(members.length, 1, `Dao should have 1 members, got ${members.length}`)
      assert(members.indexOf(bob) !== -1, "Bob should be a member")
      assert(members.indexOf(carol) === -1, "Carol should not be a member")
    });
  });

  contract('Access Control', () => {
    it('should not be able to add a member if not owner', async () => {
      await expectThrow(Dao1901Members.subscribe.sendTransaction(carol, 1, {from:carol}))
      assert(!(await Dao1901Members.isMember(carol)), "non-owners was able to add a member")
    })

    it('should not be able to transfer ownership if not owner', async () => {
      await expectThrow(Dao1901Members.changeOwner.sendTransaction(carol, {from: carol}))
      assert.equal(await Dao1901Members.owner(), alice, "non-owner was able to transfer ownership")
    })

    it('should be able to transfer ownership if owner', async () => {
      await Dao1901Members.changeOwner.sendTransaction(bob, {from:alice})
      assert.equal(await Dao1901Members.owner(), bob, "ownership was not transferred to Bob")
    })

    it('should be able to add a member if owner', async () => {
      assert(!(await Dao1901Members.isMember(carol)), "Carol should not be a member")
      await Dao1901Members.subscribe.sendTransaction(carol, 1, {from: bob})
      assert(await Dao1901Members.isMember(carol), "Carol was not added by new owner")
    })
  })
})