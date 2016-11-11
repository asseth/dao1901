Run the app with testrpc, webpack & its loaders
===============================================

**Install all dependencies**
`npm i`

**Launch testrpc**
`node_modules/.bin/testrpc`
    
**Serve the app**
`npm start`
    
Go to http://localhost:8080/
Enjoy!

**Run Mocha tests**
`npm run test`


Run the app with geth
=====================
Attach a console in dev mode
============================

    geth --dev --datadir /tmp/ethereum_dev_mode


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
