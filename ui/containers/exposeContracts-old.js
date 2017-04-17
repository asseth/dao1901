import dao1901 from 'dao1901-truffle-library';

// Set default account
web3.eth.defaultAccount = web3.eth.accounts[0];

// Expose Dao1901Members globally
window.Dao1901Members = dao1901.Dao1901Members;
// Expose Dao1901Votes globally
window.Dao1901Votes = dao1901.Dao1901Votes;
// Expose Owned globally
window.Owned = dao1901.Owned;

