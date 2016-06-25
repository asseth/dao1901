// Template to deploy contract compiled with solc --combined-json abi,bin
// in geth console
//
// Contract are deployed using the coinbase address

var {name}AbiBin = {abi_bin};

var {name}Contract = web3.eth.contract(JSON.parse({name}AbiBin.abi));

function deploy{name}(arg) {{
    console.log('deploying {name} contract...')
    return {name}Contract.new(
        arg,
        {{from:eth.coinbase,
          data: {name}AbiBin.bin, gas: 1000000}},
        function(error, contract){{
            if (error) {{
                console.error(error);
                return;
            }}
            if(!contract.address) {{
                console.log(
                    "contract {name} creation transaction: " +
                        contract.transactionHash);
            }} else {{
                console.log("contract {name} mined! Address: " + contract.address);
            }}
        }})
}}
