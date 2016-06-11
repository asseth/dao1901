var accounts;
var account;

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
$(function () {
  $('#deploy').click(function() {
    // var president = document.getElementById("president").value;
    // var tresorier = document.getElementById("tresorier").value;
    // var secretaire = document.getElementById("secretaire").value;

    var president = "0x5497efa684f5de74ea2e326274d3484a039bb1db";
    var tresorier = "0xbb2d2de3846b179359e8703a89578954b7f66769";
    var secretaire = "0x544a56943ff9685fd3a745aa0f92db57ce2d0643";
    var dao = Dao1901.deployed();
    console.log(dao)
    //   dao.createMember.sendTransaction(president, {from: account}).then(function(message) {
    //  console.log(message)
    // }).catch(function(e) {
    //   console.log(e);
    // });
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


