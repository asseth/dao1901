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

function getTransactionError(func) {
  return Promise.resolve().then(func)
    // using Geth - a transaction is still created, spending all the gas, but no state changes occur.
    .then(function(txid) {
      var tx = web3.eth.getTransaction(txid);
      var txr = web3.eth.getTransactionReceipt(txid);
      if (txr.gasUsed === tx.gas) throw new Error("all gas used");
    })
    // using TestRPC - actually throws the error
    .catch(function(err) {
      return err;
    });
}

function init() {
  // Give name to accounts
  alice = web3.eth.accounts[0];
  console.log('alice: ', alice);
  bob = web3.eth.accounts[1];
  console.log('bob: ', bob);
  carol = web3.eth.accounts[2];
  console.log('carol: ', carol);
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
  });

  describe('Member Management', () => {
    it('should not have Bob as a member if not added', () => {
      console.log('Dao1901Members.isMember(bob)', Dao1901Members.isMember(bob));
      assert(!Dao1901Members.isMember(bob), "Bob is a DAO member before subscribing")
    });

    it('should add Bob as a member for 1 year', () => {
      // subscribe account 1 for 1 year
      console.log('Owner adds a member...');
      Dao1901Members.subscribe.sendTransaction(bob, 1, {from:alice});
      assert(Dao1901Members.isMember(bob), "Bob is not a DAO member after subscribing");
    });

    it('should have owner able to revoke a member', () => {
      console.log('Owner revokes a member...', alice, Dao1901Members.owner());
      Dao1901Members.subscribe.sendTransaction(bob, 0, {from:alice}); // Subscription ends now
      assert(!Dao1901Members.isMember(bob), "Bob is still a member after revokation");
    });

    it('should readd bob and add carol', () => {
      console.log('Owner renews Bob subscription and adds Carol as a member...');
      Dao1901Members.subscribe.sendTransaction(bob, 1, {from:alice}); // renew subscription
      Dao1901Members.subscribe.sendTransaction(carol, 1, {from:alice}); // add account 2
      assert(Dao1901Members.isMember(bob), "Bob is not a DAO member after renewal");
      assert(Dao1901Members.isMember(carol), "Carol is not a DAO member after subscribing");
    });

    it('should retrieve the list of members', () => {
      let members = memberList(Dao1901Members);
      assert(members.length === 2, "Dao should have 2 members");
      assert(members.indexOf(bob) !== -1, "Bob should be a member");
      assert(members.indexOf(carol) !== -1, "Carol should be a member");
    });

    it('should revoke head (the last added member) and retrieve list', () => {
      console.log('Owner revokes head()...', alice, Dao1901Members.owner());
      Dao1901Members.subscribe.sendTransaction(Dao1901Members.head(), 0, {from:alice});

      let members = memberList(Dao1901Members);
      assert(members.length === 1, `Dao should have 1 members, got ${members.length}`);
      assert(members.indexOf(bob) !== -1, "Bob should be a member");
      assert(members.indexOf(carol) === -1, "Carol should not be a member");
    });
  });

  describe('Access Control', () => {
    it('should not be able to add a member if not owner', () => {
      console.log('Non-owner tries to insert a subscription...');
      return getTransactionError(() => Dao1901Members.subscribe.sendTransaction(carol, 1, {from:carol}))
        .then((err) => {
          assert.isDefined(err, "transaction should have thrown");
          assert(!Dao1901Members.isMember(carol), "non-owners was able to add a member");
        });
    });

    it('should not be able to transfer ownership if not owner', () => {
      console.log('Non-owner tries to transfer ownership...');
      return getTransactionError(() => Dao1901Members.changeOwner.sendTransaction(carol, {from:carol}))
        .then((err) => {
          assert.isDefined(err, "transaction should have thrown");
          assert(Dao1901Members.owner() === alice, "non-owner was able to transfer ownership");
        });
    });

    it('should be able to transfer ownership if owner', () => {
      console.log('Owner transfer ownership...');
      Dao1901Members.changeOwner.sendTransaction(bob, {from:alice});
      assert(Dao1901Members.owner() === bob, "ownership was not transferred to Bob");
    });

    it('should be able to add a member if owner', () => {
      console.log('New owner bob adds carol as a member...');
      assert(!Dao1901Members.isMember(carol), "Carol should not be a member");
      Dao1901Members.subscribe.sendTransaction(carol, 1, {from:bob});
      assert(Dao1901Members.isMember(carol), "Carol was not added by new owner");
    });
  });

});
