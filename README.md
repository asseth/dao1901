Requirements: 
- python 3.5
- solc 0.4.4

Trello: https://trello.com/b/bVfPFfjM/tasks



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

Launch the Geth node

    geth --dev --rpc --rpcapi 'web3,eth,debug' --rpccorsdomain="*" --datadir /tmp/ethereum_dev_mode

In an other shell, run the following to attach a console
and preloading the test functions
    
    geth --dev --preload tests/TestDao1901.js attach ipc:/tmp/ethereum_dev_mode/geth.ipc
    

Make contracts ready to be deployed
===================================
run

    npm run compile
     
or if you like typing

    cd tests
    python3.5 compile.py ../contracts/Owned.sol
    python3.5 compile.py ../contracts/Dao1901Members.sol
    python3.5 compile.py ../contracts/Dao1901Votes.sol

Three files are created (one per contracts)

    
Auto Setup
==========
In the geth console, 
load script "tests/autosetup.js"
It will:
 - create 3 accounts if not already 3 (alias name alice, bob, carol)
 - run the miner (2 CPU) 
 - contracts ready to deploy

```
    loadScript("tests/autosetup.js");
```
   
then deploy contracts

    var Dao1901Members = deployDao1901Members();
    // when Dao1901Members is mined
    var Dao1901Votes = deployDao1901Votes(Dao1901Members.address);
    
then serve the app
    
    npm run start


or DIY
======

    // loadScript("TestDao1901.js")    // equiv to --preload
    // check if accounts exists
    personal.listAccounts 
    // create account if no one exists
    // it will set eth.coinbase automatically
    personal.newAccount("");
    // check eth.coinbase
    eth.coinbase
    // unlock your account
    personal.unlockAccount(eth.accounts[0], "", 3600);
    
run the miner 

    miner.start(2)
    
Deploy the contracts
====================
load the Dao1901Members deploy function
and run it.
you also initiate daoMembers variable with the returned js object,
used in runMemberTests()

    loadScript("Dao1901Members.js");
    var Dao1901Members = deployDao1901Members();

Wait Dao1901Members to be mined, then:
same for Dao1901Votes

    loadScript("Dao1901Votes.js");
    var Dao1901Votes = deployDao1901Votes(Dao1901Members.address);
    
Wait Dao1901Votes to be mined


Run the tests
=============
    runMemberTests();
    runVoteTests(Dao1901Votes);

Type `exit` to quit the console 
