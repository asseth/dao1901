Requirements:
- node ^7.8.0
- python 3.5
- solc ^0.4.11
- Truffle ^3.3.0
- Testrpc ^3.0.5

Trello: https://trello.com/b/bVfPFfjM/tasks

Introduction
============

This application is divided in two sections, protocol and ui.
Protocol folder manage all things related to Ethereum, whereas ui will import protocol as a npm module.
This architecture offers a clean separation between front and back.

The UI is built with React, Redux, Redux-Saga, Bootstrap 4, etc.
    

Run the app with Testrpc and Truffle (recommended way)
======================================================

At the root level, install all dependencies

    npm install

In a separate tab, run testrpc

    testrpc [-s toto]
    or node_modules/.bin/testrpc
    
In a separate tab, compile and migrate the contracts

    cd protocol
    npm install
    [truffle compile --compile-all]
    truffle migrate

Attach a console

    truffle console
    or geth attach http://localhost:8545

Serve the app

    npm run dev

=> Go to http://localhost:8080/

Run UI tests (using Jest)

    npm run testUI

Run Smart Contract tests (using Mocha and Chai under the hood)

    npm run testProtocol
    
    
If you work on the protocol, you may want to use npm link to avoid reinstalling the lib at each change.
    
    npm run linkprotocol
    
    

Run the app with Geth
=====================

Launch the Geth node

    geth --dev --rpc --rpcapi 'web3,eth,debug' --rpccorsdomain="*" --datadir /tmp/ethereum_dev_mode

To load the auto setup

    geth --dev --preload autoSetupForGeth.js attach ipc:/tmp/ethereum_dev_mode/geth.ipc
    

Prepare contracts to be deployed, with python, based on a template 
==================================================================
run

    npm run compile

which is equivalent to

    cd ./protocol/customDeploy
    python3.5 compile.py ../contracts/Owned.sol
    python3.5 compile.py ../contracts/Dao1901Members.sol
    python3.5 compile.py ../contracts/Dao1901Votes.sol

Three files are created (one per contracts)

Then you need to do the following boilerplate stuff, either using autoSetup or manually


Auto Setup for Geth
===================
In the geth console,
load script "autoSetupForGeth.js"
It will:
 - create 3 accounts if not already 3 (alias name alice, bob, carol)
 - run the miner (2 CPU)
 - load contract deployment functions

```
    loadScript("autoSetupForGeth.js");
```

then deploy contracts

    var Dao1901Members = deployDao1901Members();
    // when Dao1901Members is mined
    var Dao1901Votes = deployDao1901Votes(Dao1901Members.address);

then serve the app

    npm run start


The manual way with Geth
========================
In the geth console

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

load the Dao1901Members deploy function and run it

    loadScript("Dao1901Members.js");
    var Dao1901Members = deployDao1901Members();

Wait Dao1901Members to be mined, then:
same for Dao1901Votes

    loadScript("Dao1901Votes.js");
    var Dao1901Votes = deployDao1901Votes(Dao1901Members.address);
    
Wait Dao1901Votes to be mined

Type `exit` to quit the console 