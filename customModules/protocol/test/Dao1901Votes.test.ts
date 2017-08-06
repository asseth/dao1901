import {expectThrow} from '../helpers/index'
import * as assert from 'assert'
const Dao1901MembersAbstraction = artifacts.require('Dao1901Members')
const Dao1901VotesAbstraction = artifacts.require('Dao1901Votes')
let Dao1901Members, Dao1901Votes
let alice, bob, carol
let itClean = (title, itCb) => contract(title, () => it(title, itCb))
// Retrieve the votes
async function fetchAllVotes(Dao1901Votes, propId) {
  let votes = []
  let addr = (await Dao1901Votes.proposals(propId))[2] // vote list head
  while (addr != 0) {
    let v = await Dao1901Votes.getVote(propId, addr)
    votes.push(v[0])
    addr = v[1]
  }
  return votes
}
// ------------------------------------
// Dao1901 Votes
// ------------------------------------
contract('Dao1901Votes', (accounts) => {
  before(async () => {
    Dao1901Members = await Dao1901MembersAbstraction.deployed()
    Dao1901Votes = await Dao1901VotesAbstraction.deployed()
    // Set accounts
    alice = accounts[0]
    console.log('alice: ', alice)
    bob = accounts[1]
    console.log('bob: ', bob)
    carol = accounts[2]
    console.log('carol: ', carol)
  })
  contract('initialization phase', () => {
    it('should deploy contract', () => {
      assert(Dao1901Votes.address, "contract is not deployed")
    })
    it('should have the right owner', async () => {
      assert.equal(await Dao1901Votes.owner(), alice, 'invalid vote contract owner')
    })
    it('should have the Members contract', async () => {
      console.log('Dao1901Votes.membersContract()', await Dao1901Votes.membersContract())
      assert(await Dao1901Votes.membersContract(), 'Vote contract is lacking a members contract')
    })
    it('should have zero vote', async () => {
      assert.equal((await Dao1901Votes.nProposals()).valueOf(), 0, 'vote contract initialized with non zero votes')
    })
  })
  contract('Proposal creation', () => {
    it('should not be possible to create proposal if not member', async () => {
      await expectThrow(Dao1901Votes.createProposal.sendTransaction('Merguez or Chipo ?', 7, {from: carol}))
    })
    it('should not be possible to create proposal if member', async () => {
      await expectThrow(Dao1901Votes.createProposal.sendTransaction('Merguez or Chipo ?', 7, {from: bob}))
    })
    it('should be possible to create proposal if owner', async () => {
      await Dao1901Votes.createProposal.sendTransaction('Merguez or Chipo ?', 7, {from: alice})
      assert.equal((await Dao1901Votes.nProposals()).valueOf(), 1, 'proposal creation failed')
      assert.equal((await Dao1901Votes.proposals(1))[0], 'Merguez or Chipo ?', 'proposal description incorrect')
    })
    it('should have proposal properties set', async () => {
      assert.equal((await Dao1901Votes.proposals(1))[0].valueOf(), 'Merguez or Chipo ?', 'invalid description in proposal')
      assert((await Dao1901Votes.proposals(1))[1].valueOf() >= 1499200708, 'invalid deadline in proposal')
      assert.equal((await Dao1901Votes.proposals(1))[2].valueOf(), 0x0000000000000000000000000000000000000000, 'invalid head in proposal')
    })
  })
  contract('Voting', () => {
    before(async () => {
      // Create one proposal
      await Dao1901Votes.createProposal.sendTransaction('Merguez or Chipo ?', 7, {from: alice})
      // Make sure alice & bob are the only members
      await Dao1901Members.subscribe.sendTransaction(alice, 1, {from: alice})
      await Dao1901Members.subscribe.sendTransaction(bob, 1, {from: alice})
    })
    it('should have 2 votes', async () => {
      console.log('simple vote...')
      await Dao1901Votes.vote.sendTransaction(1, 'Chipo', {from: alice})
      await Dao1901Votes.vote.sendTransaction(1, 'Merguez', {from: bob})
      // carol tries to vote but can't
      await expectThrow(Dao1901Votes.vote.sendTransaction(1, 'Brochette', {from: carol}))
      let votes = await fetchAllVotes(Dao1901Votes, 1)
      assert.equal(votes.length, 2, "Vote 1 should have 2 votes")
      assert(votes.indexOf('Merguez') !== -1, "Merguez vote not recorded")
      assert(votes.indexOf('Chipo') !== -1, "Chipo vote not recorded")
      assert(votes.indexOf('Brochette') === -1, "Chipo vote not recorded")
    })
    it('should voting twice updates the previous vote', async () => {
      await Dao1901Votes.vote.sendTransaction(1, 'Second vote', {from: alice})
      let votes = await fetchAllVotes(Dao1901Votes, 1)
      assert(votes.indexOf('Second vote') !== -1, "alice vote was not updated")
    })
    it.skip('should have vote expiration', async () => {
      await Dao1901Votes.createProposal.sendTransaction('expiration vote', -1, {from: alice})
      await Dao1901Members.subscribe.sendTransaction(alice, 1, {from: alice})
      await Dao1901Members.subscribe.sendTransaction(bob, 1, {from: alice})
      // vote
      await Dao1901Votes.vote.sendTransaction(1, 'foo', {from: alice})
      await Dao1901Votes.vote.sendTransaction(1, 'bar', {from: bob})
      let votes = await fetchAllVotes(Dao1901Votes, 1)
      assert.equal(votes.length, 0, "vote was not expired")
    })
    itClean('should set empty choice as invalid', async () => {
      await Dao1901Votes.createProposal.sendTransaction('eggs, bacon or spam ?', 7, {from: alice})
      await Dao1901Members.subscribe.sendTransaction(alice, 1, {from: alice})
      await expectThrow(Dao1901Votes.vote.sendTransaction(1, '', {from: alice}))
    })
  })
})