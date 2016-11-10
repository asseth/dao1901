import { Dao1901Members, web3 } from '../../contracts/Dao1901Members.sol';

const assert = require('chai').assert;

let alice, bob, carol;

// Retrieve the current list of members
function memberList(daoMembers) {
  var members = [];
  var addr = daoMembers.head();
  while (addr != 0) {
    if (daoMembers.isMember.call(addr)) {
      members.push(addr)
    }
    addr = daoMembers.subscriptions(addr)[1]; // Access with .next ?
  }
  return members;
}

// Retrieve the votes
function voteList(daoVote, voteId) {
  var votes = [];
  var addr = daoVote.proposals(voteId)[2]; // vote list head
  while (addr != 0) {
    v = daoVote.getVote(voteId, addr);
    votes.push(v[0]);
    addr = v[1];
  }
  return votes;
}

function init() {
  // Give name to accounts
  alice = web3.eth.accounts[0];
  bob = web3.eth.accounts[1];
  carol = web3.eth.accounts[2];
}


describe('Dao1901Members', () => {
  before(() => {
    init();
  });

  describe('initialization phase', () => {
    it('should deploy contract', () => {
      console.log('Dao1901Members.address', Dao1901Members.address);
      assert(Dao1901Members.address, "contract is not deployed");
    });

    it('should have Alice as owner', () => {
      console.log('Dao1901Members.owner()', Dao1901Members.owner());
      assert(Dao1901Members.owner() == alice, "first owner is not contract creator");
    });

    it('should have members list head correctly initialized to 0x00', () => {
      console.log('Dao1901Members.head()', Dao1901Members.head());
      assert(Dao1901Members.head() == 0x00, "members list head is not correctly initialized")
    });

    it('should not have Bob as a member', () => {
      console.log('Dao1901Members.isMember.call(bob)', Dao1901Members.isMember.call(bob));
      assert(!Dao1901Members.isMember(bob), "Bob is a DAO member before subscribing")
    });
  });
});
