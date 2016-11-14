Run the app with Testrpc
========================

Install all dependencies

    npm i

Launch testrpc
    
    node_modules/.bin/testrpc
    
Serve the app

    npm start
    
Go to http://localhost:8080/
Enjoy!

Run Mocha tests

    npm run test


Run the app with Geth
=====================

Launch the node

    geth --dev --rpc --rpccorsdomain="http://localhost:8080" --datadir /tmp/ethereum_dev_mode

In an other shell, run the following to have a console
    
    geth --dev attach /tmp/ethereum_dev_mode/geth.ipc
    
Then you need a default account
In the console, run 

    // check if accounts exists
    personal.listAccounts 
    // create account if no one exists
    // it will set eth.coinbase automatically
    personal.newAccount("");
    // check eth.coinbase
    eth.coinbase
    // unlock your account
    personal.unlockAccount(eth.accounts[0], "", 3600);
    
    // run the miner 
    miner.start(1)
    
Type `exit` to quit the console 
    

Compile and deploy Dao1901 in dev mode in another shell
=======================================================

    cd tests
    python3.5 compile.py ../contracts/Owned.sol
    python3.5 compile.py ../contracts/Dao1901Members.sol
    python3.5 compile.py ../contracts/Dao1901Votes.sol

Three files are created (one per contracts)

    geth --preload TestDao1901Dumb.js attach ipc:/tmp/ethereum_dev_mode/geth.ipc

It will open geth interactive javascript console after having load TestDao1901Dumb.js


Run tests in this geth javascript console
=========================================

Run the Members tests:

    var daoMembers = deployDao1901Members();

Wait Dao1901Members to be mined, then:

    runMemberTests()

Run the Votes tests:

    var daoVotes = deployDao1901Votes(daoMembers.address);

Wait Dao1901Votes to be mined, then:

    runVoteTests(daoVotes)
