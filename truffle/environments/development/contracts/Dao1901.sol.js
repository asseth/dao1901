// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"members","outputs":[{"name":"key","type":"address"},{"name":"payed","type":"bool"},{"name":"canVote","type":"bool"},{"name":"role","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[{"name":"_secretary","type":"address"},{"name":"_president","type":"address"},{"name":"_treasurer","type":"address"}],"name":"setBureau","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "6060604052600160a060020a0333166000908152602081905260409020805460b060020a60ff021916905560fd806100376000396000f3606060405260e060020a600035046308ae4b0c811460245780631b6b8656146096575b005b60db60043560006020819052908152604090205473ffffffffffffffffffffffffffffffffffffffff81169074010000000000000000000000000000000000000000810460ff908116917501000000000000000000000000000000000000000000810482169160b060020a9091041684565b602260043560243560443573ffffffffffffffffffffffffffffffffffffffff331660009081526020819052604081205460ff60b060020a90910416811460f7576002565b6060938452911515608090815290151560a05260c09190915290f35b5050505056",
    unlinked_binary: "6060604052600160a060020a0333166000908152602081905260409020805460b060020a60ff021916905560fd806100376000396000f3606060405260e060020a600035046308ae4b0c811460245780631b6b8656146096575b005b60db60043560006020819052908152604090205473ffffffffffffffffffffffffffffffffffffffff81169074010000000000000000000000000000000000000000810460ff908116917501000000000000000000000000000000000000000000810482169160b060020a9091041684565b602260043560243560443573ffffffffffffffffffffffffffffffffffffffff331660009081526020819052604081205460ff60b060020a90910416811460f7576002565b6060938452911515608090815290151560a05260c09190915290f35b5050505056",
    address: "0xc24772b6bfa14d456448d296b02c2c76cdb53bb5",
    generated_with: "2.0.9",
    contract_name: "Dao1901"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Dao1901 error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Dao1901 error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Dao1901 error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Dao1901 error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Dao1901 = Contract;
  }

})();
