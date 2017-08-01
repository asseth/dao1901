// Template to deploy contract compiled with solc --combined-json abi,bin
// in geth console
//
// Contract are deployed using the coinbase address

var OwnedAbiBin = {'bin': '606060405233600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055506101668061004f6000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480638da5cb5b14610047578063a6f9dae11461008557610042565b610002565b346100025761005960048050506100a2565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576100a060048080359060200190919050506100c8565b005b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561012457610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b5056', 'abi': '[{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"}]\n'};

var OwnedContract = web3.eth.contract(JSON.parse(OwnedAbiBin.abi));

function deployOwned(arg) {
    console.log('deploying Owned contract...');
    return OwnedContract.new(
        arg,
        {from: web3.eth.coinbase,
          data: OwnedAbiBin.bin, gas: 1000000},
        function(error, contract){
            if (error) {
                console.error(error);
                return;
            }
            if(!contract.address) {
                console.log(
                    "contract Owned creation transaction: " +
                        contract.transactionHash);
              console.log('contract 1: ', contract);
            } else {
                console.log("contract Owned mined! Address: " + contract.address);
              // Expose Dao1901Members globally
              console.log('contract 2: ', contract);
              window.Owned = contract;
            }
        })
}
