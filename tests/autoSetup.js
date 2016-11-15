// Security best practices ftw
function unlockAllAccounts(){
  for (var i = 0; i < eth.accounts.length; i++) {
    personal.unlockAccount(eth.accounts[i], "", 3600);
  }
}

function assert(condition, message) {
  if (!condition) throw message;
}

// We want 3 accounts for our tests
while (eth.accounts.length < 3) {
  console.log("Creating test account...");
  personal.newAccount(""); // Empty passphrase
}

// Set account to receive ether (mining earns)
miner.setEtherbase(eth.accounts[0]);

// Start the miner to validate all the transactions below
miner.start(2);

// Security best practices ftw
unlockAllAccounts();

var alice = eth.accounts[0];
var bob = eth.accounts[1];
var carol = eth.accounts[2];

admin.sleepBlocks(1); // block reward for alice

// Alice sends some ether to bob and carol, so everybody will have ether and the possibility to send transactions
eth.sendTransaction({from:alice, to:bob, value: web3.toWei(1, "ether")});
eth.sendTransaction({from:alice, to:carol, value: web3.toWei(1, "ether")});
admin.sleepBlocks(3);

// Make contracts ready to deployment
loadScript("tests/Dao1901Members.js");
loadScript("tests/Dao1901Votes.js");
