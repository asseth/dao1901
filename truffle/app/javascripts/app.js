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

    var president = "0xccd10fb4ded1e18796fe2858c6ac9e018489857a";
    var tresorier = "0x4838775c77306c0fce8f9d5c1ba89b421ecb5a02";
    var secretaire = "0x25cfc88f505ed9244e949418ca5d87e8335e5ec7";
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


