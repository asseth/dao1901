import dao1901 from 'dao1901-truffle-library';

if (typeof web3 !== 'undefined') {
  window.web3 = new Web3(web3.currentProvider);
  console.log('web3.currentProvider', web3.currentProvider);
  console.log('web3', web3);
} else {
  window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
// Expose Dao1901Members globally
window.Dao1901Members = dao1901.Dao1901Members;
// Expose Dao1901Votes globally
window.Dao1901Votes = dao1901.Dao1901Votes;
// Expose Owned globally
window.Owned = dao1901.Owned;

