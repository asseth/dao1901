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

    runMemberTests()

then 

    runVoteTests()




