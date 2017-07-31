import * as contract from 'truffle-contract';

const Dao1901Members = contract(require('./build/contracts/Dao1901Members.json'));
const Dao1901Votes = contract(require('./build/contracts/Dao1901Votes.json'));
const Owned = contract(require('./build/contracts/Owned.json'));

export default {
  Owned: Owned,
  Dao1901Members: Dao1901Members,
  Dao1901Votes: Dao1901Votes
}