// Template to deploy contract compiled with solc --combined-json abi,bin
// in geth console
//
// Used by compile.py
//
// Contracts are deployed using the coinbase address

var {name}AbiBin = {abi_bin};

var {name}Contract = web3.eth.contract(JSON.parse({name}AbiBin.abi));

var deploy{name} = function() {{
    console.log('Deploying {name} contract...')
    return {name}Contract.new(
        null,
        {{from:eth.coinbase,
          data: {name}AbiBin.bin, gas: 1000000}},
        function(error, contract){{
            if (error) {{
                console.error(error);
                return;
            }}

            if(!contract.address) {{
                console.log(
                    "Contract {name}: transaction sent: TransactionHash: " +
                        contract.transactionHash + " waiting to be mined..."
                );
            }} else {{
                console.log("Contract {name} mined! Address: " + contract.address);
                console.log(contract);
            }}
        }})
}}
