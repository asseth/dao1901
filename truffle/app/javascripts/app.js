var accounts;
var account;
function test(message) {
  var president = document.getElementById("president").value.toString();
  var tresorier = document.getElementById("tresorier").value.toString();
  var secretaire = document.getElementById("secretaire").value.toString();
  var dao = Dao1901.deployed();
  console.log(dao)
  console.log(president, tresorier, secretaire)
  dao.setBureau.sendTransaction(secretaire, president, tresorier, {from: account}).then(function(message) {
  	console.log(message)
  }).catch(function(e) {
    console.log(e);
  });


  // dao.members.call().then(function(message) {
  // 	console.log(message)
  // }).catch(function(e) {
  //   console.log(e);
  // });
};
window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

  });
}
