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
  var dao;

  $('#deploy').click(function() {
    // var president = document.getElementById("president").value;
    // var tresorier = document.getElementById("tresorier").value;
    // var secretaire = document.getElementById("secretaire").value;

    dao = Dao1901.deployed();
    dao.setBureau.sendTransaction(secretaire, president, tresorier, {from: account}).then(function(message) {
      document.location.href = "/monitor.html";
    }).catch(function(e) {
      document.getElementById("error").innerHTML = "Vous n'etes pas autorisé à modifier le bureau de l'association.<br/> <a href='/monitor.html'>Voir les membres du bureau</a>";
    });
  });
  $('#getBureau').click(function() {
    var membersLength;
    var users = {};
    dao = Dao1901.deployed();
    dao.getMemberLength.call({from: account}).then(function(message) {
      membersLength = message['c'][0]
      console.log(dao.getMemberAdresse.call(1, {from: account}))
      for(var i=1 ; i < membersLength; i++){
        dao.getMemberAdresse.call(i, {from: account}).then(function(address) {
          users[address] = {'address': address}
          dao.getMemberSince.call(address, {from: account}).then(function(since) {
            users[address]['since'] = since['c'][0]
          });
          dao.getMemberPayed.call(address, {from: account}).then(function(payed) {
            users[address]['payed'] = payed
          });
          dao.getMemberCanVote.call(address, {from: account}).then(function(vote) {
            users[address]['vote'] = vote
          });
          dao.getMemberRole.call(address, {from: account}).then(function(role) {
            users[address]['role'] = role['c'][0]
          });
        }).catch(function(e) {
          console.log(e);
        });  
      }
    }).catch(function(e) {
      console.log(e);
    });
    setTimeout(function(){ 
      console.log(users);
      var tablearea = document.getElementById('tablearea');

//       var tr = [];

//       var td1 = document.createElement('td');
//       var td2 = document.createElement('td');

//       var text1 = document.createTextNode('Text1');
//       var text2 = document.createTextNode('Text2');

//       for (var i = 1; i < 4; i++){
//           tr[i] = document.createElement('tr');   
//           for (var j = 1; j < 4; j++){
//               td1.appendChild(text1);
//               td2.appendChild(text2);
//               tr[i].appendChild(td1);
//               tr[i].appendChild(td2);
//           }           
//           table.appendChild(tr[i]);

// }      
      var table = document.createElement('table');
      for (var addr in users){

          var tr = document.createElement('tr'); 
          for (var key in users[addr])  {
            console.log(users[addr][key])
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(users[addr][key]));
            tr.appendChild(td);
          }
          table.appendChild(tr);
      }
      tablearea.appendChild(table);
   }, 3000);

  });
});
    
    


    // dao.getMemberCanVote.call(1, {from: account}).then(function(message) {
    //   console.log(message)
    // }).catch(function(e) {
    //   console.log(e);
    // });

    // TODO : déployer le contrat avec les membres du bureau
    // TODO : ouvrir page



