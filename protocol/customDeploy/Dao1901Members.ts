// Template to deploy contract compiled with solc --combined-json abi,bin
// in geth console
//
// Contract are deployed using the coinbase address

import * as Dao1901Votes from './Dao1901Votes';


var Dao1901MembersAbiBin = {'bin': '606060405233600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055506104e38061004f6000396000f360606040523615610074576000357c0100000000000000000000000000000000000000000000000000000000900480638da5cb5b146100795780638de69284146100b75780638f7dcfa3146100dd578063a230c5241461011b578063a6f9dae11461014e578063f046395a1461016b57610074565b610002565b346100025761008b60048050506101b9565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576100db60048080359060200190919080359060200190919050506101df565b005b34610002576100ef600480505061038e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100025761013660048080359060200190919050506103b4565b60405180821515815260200191505060405180910390f35b346100025761016960048080359060200190919050506103fb565b005b34610002576101866004808035906020019091905050610499565b604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561023b57610002565b6000600260005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005054141561034657600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b6301e1338081024201600260005060008473ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050819055505b5b5050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600042600260005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005054101590506103f6565b919050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561045757610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b60026000506020528060005260406000206000915090508060000160005054908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508256', 'abi': '[{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_member","type":"address"},{"name":"_yearsDuration","type":"uint256"}],"name":"subscribe","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"head","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_member","type":"address"}],"name":"isMember","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"subscriptions","outputs":[{"name":"end","type":"uint256"},{"name":"next","type":"address"}],"payable":false,"type":"function"}]\n'};

var Dao1901MembersContract = web3.eth.contract(JSON.parse(Dao1901MembersAbiBin.abi));

export default function deployDao1901Members(arg) {
    console.log('deploying Dao1901Members contract...');
    return Dao1901MembersContract.new(
        arg,
        {from: web3.eth.coinbase,
          data: Dao1901MembersAbiBin.bin, gas: 1000000},
        function(error, contract){
            if (error) {
                console.error(error);
                return;
            }
            if(!contract.address) {
                console.log(
                    "contract Dao1901Members creation transaction: " +
                        contract.transactionHash);
              console.log('contract 1: ', contract);
            } else {
                console.log("contract Dao1901Members mined! Address: " + contract.address);
              // Expose Dao1901Members globally
              console.log('contract 2: ', contract);
              window.Dao1901Members = contract;
              Dao1901Votes(Dao1901Members.address);
            }
        })
}
