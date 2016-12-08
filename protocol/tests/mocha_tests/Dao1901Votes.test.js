import { Dao1901Votes, web3 } from '../../contracts/Dao1901Votes.sol';

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


describe('Dao1901Votes', () => {
  before(() => {
    init();
  });

  describe('initialization phase', () => {
    it('should deploy contract', () => {
      console.log('Dao1901Votes.address', Dao1901Votes.address);
      assert(Dao1901Votes.address, "contract is not deployed");
    });

    it('should have the right owner', () => {
      console.log('voting dao initialization...');
      assert(Dao1901Votes.owner() == alice, 'invalid vote contract owner');
    });

    it('should have members contract', () => {
      console.log('Dao1901Votes.membersContract()', Dao1901Votes.membersContract());
      assert(Dao1901Votes.membersContract() != 0, 'Vote contract is lacking a members contract');
    });

    /*
    daoMembers = Dao1901MembersContract.at(daoVotes.membersContract());

    // Make sure alice & bob are the only members
    daoMembers.subscribe.sendTransaction(alice, 1, {from:alice});
    daoMembers.subscribe.sendTransaction(bob, 1, {from:alice});
    daoMembers.subscribe.sendTransaction(carol, 0, {from:alice});
    admin.sleepBlocks(3);
    */
  });
});
