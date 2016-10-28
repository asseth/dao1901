Requires: python3.5, solc, geth (can be executed in assethbox)

Attach a console in dev mode
============================

    geth --dev --datadir /tmp/ethereum_dev_mode


Compile and deploy Dao1901 in dev mode in another shell
=======================================================
 
    cd tests
    make

It will open geth interactive javascript console


Run tests in this geth javascript console
=========================================

Run the Members tests by doing:
    `var daoMembers = deployDao1901Members();`
Wait Dao1901Members to be mined, then:
    `runMemberTests()`

Run the Votes tests:
    `var daoVotes = deployDao1901Votes(daoMembers.address);`
Wait Dao1901Votes to be mined, then:
     `runVoteTests(daoVotes)`




