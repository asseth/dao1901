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

After Dao1901Members contract is mined (save the returned address), 
you can run the Members tests:
    `runMemberTests()`

and/or the Votes tests:
    `var daoVotes = deployDao1901Votes(Dao1901Members_Contract_Address);`
Wait Dao1901Votes to be mined, then:
     `runVoteTests(daoVotes)`




