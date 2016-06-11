var accounts;
var account;
var president;
var tresorier;
var secretaire;

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
    president = accounts[1];
    tresorier = accounts[2];
    secretaire = accounts[3];

  });
}
$(function () {
  $('#deploy').click(function() {
    // var president = document.getElementById("president").value;
    // var tresorier = document.getElementById("tresorier").value;
    // var secretaire = document.getElementById("secretaire").value;

    var dao = Dao1901.deployed();
    console.log(dao)

    dao.setBureau.sendTransaction(secretaire, president, tresorier, {from: account}).then(function(message) {
      console.log(message)
    }).catch(function(e) {
      console.log(e);
    });
    
    dao.getMemberSince.call(1, {from: account}).then(function(message) {
      console.log(message)
    }).catch(function(e) {
      console.log(e);
    });
    dao.getMemberCanVote.call(1, {from: account}).then(function(message) {
      console.log(message)
    }).catch(function(e) {
      console.log(e);
    });
    dao.getMemberLength.call({from: account}).then(function(message) {
      console.log(message)
    }).catch(function(e) {
      console.log(e);
    });
    // TODO : déployer le contrat avec les membres du bureau
    // TODO : ouvrir page
  });
});


