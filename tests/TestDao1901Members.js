miner.setEtherbase(eth.accounts[0])
miner.start(8)

// Security best practices ftw
for (i = 0; i < eth.accounts.length; i++) {
    personal.unlockAccount(eth.accounts[i], "", 3600);
}

var alice = eth.accounts[0];
var bob = eth.accounts[1];
var carol = eth.accounts[2];

admin.sleepBlocks(1);           // block reward for alice
eth.sendTransaction({from:alice, to:bob, value: web3.toWei(1, "ether")})
eth.sendTransaction({from:alice, to:carol, value: web3.toWei(1, "ether")})
admin.sleepBlocks(3);

loadScript('Dao1901Members.js');

var dao = deployDao1901Members();

// This is how to retrieve the current list of members
function memberList(dao) {
    var members = [];
    var addr = dao.head();
    while (addr != 0) {
        if (dao.isMember.call(addr)) {
            members.push(addr)
        }
        addr = dao.subscriptions(addr)[1]; // Access with .next ?
    }
    return members;
}

function assert(condition, message) {
    if (!condition) throw message;
}

// needs to be called manually for now :'-(
function runTests() {
    assert(dao.address, "contract is not deployed");
    assert(dao.owner() == alice, "first owner is not contract creator");
    assert(dao.head() == 0x00, "members list head is not correctly initialized")

    assert(!dao.isMember.call(bob), "Bob is a DAO member before subscribing")

    // subscribe account 1 for 1 year
    console.log('Owner adds a member...')
    dao.subscribe.sendTransaction(bob, 1, {from:alice});
    admin.sleepBlocks(3);
    assert(dao.isMember.call(bob), "Bob is not a DAO member after subscribing");

    // owner revoke a member
    console.log('Owner revokes a member...')
    dao.subscribe.sendTransaction(bob, 0, {from:alice}); // Subscription ends now
    admin.sleepBlocks(3);
    assert(!dao.isMember.call(bob), "Bob is still a member after revokation");

    // Retrieve the list of subscribers
    console.log('Owner renews subscription and adds a member...')
    dao.subscribe.sendTransaction(bob, 1, {from:alice}); // renew subscription
    dao.subscribe.sendTransaction(carol, 1, {from:alice}); // add account 2
    admin.sleepBlocks(3);
    assert(dao.isMember.call(bob), "Bob is not a DAO member after renewal");
    assert(dao.isMember.call(carol), "Carol is not a DAO member after subscribing");

    var members = memberList(dao);
    assert(members.length == 2, "Dao should have 2 members")
    assert(members.indexOf(bob) != -1, "Bob should be a member")
    assert(members.indexOf(carol) != -1, "Carol should be a member")

    // Revoke head() and retrieve list
    console.log('Owner revokes head()...')
    dao.subscribe.sendTransaction(dao.head(), 0, {from:alice});
    admin.sleepBlocks(3);

    var members = memberList(dao);
    assert(members.length == 1, "Dao should have 1 members")
    assert(members.indexOf(bob) != -1, "Bob should be a member")
    assert(members.indexOf(carol) == -1, "Carol should not be a member")

    // Accces control
    console.log('Non-owner tries to insert a subscription...')
    dao.subscribe.sendTransaction(carol, 10, {from:carol});
    admin.sleepBlocks(3);
    assert(!dao.isMember.call(carol), "non-owners was able to add a member");

    console.log('Non-owner tries to transfer ownership...')
    dao.changeOwner.sendTransaction(carol, {from:carol});
    admin.sleepBlocks(3);
    assert(dao.owner() == alice, "non-owner was able to transfer ownership");

    // Transfer ownership
    console.log('Owner transfer ownership...')
    dao.changeOwner.sendTransaction(bob, {from:alice});
    admin.sleepBlocks(3);
    assert(dao.owner() == bob, "ownership was not transfered to Bob");

    // new owner subscribes
    console.log('New owner adds a member...')
    assert(!dao.isMember.call(carol), "Carol should not be a member");
    dao.subscribe.sendTransaction(carol, 1, {from:bob});
    admin.sleepBlocks(3);
    assert(dao.isMember.call(carol), "Carol was not added by new owner");

    return 'DAO 1901 tests OK';
};
