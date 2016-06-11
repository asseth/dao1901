function test(message) {
  var president = document.getElementById("president").value;
  var tresorier = document.getElementById("tresorier").value;
  var secretaire = document.getElementById("secretaire").value;
  console.log(president, tresorier, secretaire);
  status.innerHTML = message;
};
