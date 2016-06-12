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
    dao.setBureau.sendTransaction(secretaire, president, tresorier, {from: account}).then(function(message) {
      document.location.href = "/monitor.html";
    }).catch(function(e) {
      document.getElementById("error").innerHTML = "Vous n'etes pas autorisé à modifier le bureau de l'association.<br/> <a href='/monitor.html'>Voir les membres du bureau</a>";
    });
  });
});
    // var membersLength;
    // var users
    // dao.getMemberLength.call({from: account}).then(function(message) {
    //   membersLength = message['c'][0]
    //   users = new Array(membersLength)
    //   for(var i=0 ; i < membersLength; i++){
    //     users[i] = {}
    //   }
    //   for(var i=0 ; i < membersLength; i++){
        
    //     dao.getMemberSince.call(i, {from: account}).then(function(message) {users[i] = {since:message['c'][0]}});
    //     // dao.getMemberPayed.call(i, {from: account}).then(function(message) {users[i].push(message['c'][0])});
    //     // dao.getMemberCanVote.call(i, {from: account}).then(function(message) {users[i].push(message['c'][0])});
    //     // dao.getMemberRole.call(i, {from: account}).then(function(message) {users[i].push(message['c'][0])});
    //     // dao.getMemberAdresse.call(i, {from: account}).then(function(message) {users[i].push(message['c'][0])});
    //   }
    //   console.log(users)
    // }).catch(function(e) {
    //   console.log(e);
    // });
    // setTimeout(function(){console.log(users); }, 6000);
    


    // dao.getMemberCanVote.call(1, {from: account}).then(function(message) {
    //   console.log(message)
    // }).catch(function(e) {
    //   console.log(e);
    // });

    // TODO : déployer le contrat avec les membres du bureau
    // TODO : ouvrir page



