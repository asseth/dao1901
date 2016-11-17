// Retrieve the current list of members
function memberList(Dao1901Members) {
    var members = [];
    var addr = Dao1901Members.head();
    while (addr != 0) {
        if (Dao1901Members.isMember.call(addr)) {
            members.push(addr)
        }
        addr = Dao1901Members.subscriptions(addr)[1]; // Access with .next ?
    }
    return members;
}

// Retrieve the votes
function voteList(Dao1901Votes, voteId) {
    var votes = [];
    var addr = Dao1901Votes.proposals(voteId)[2]; // vote list head
    while (addr != 0) {
        var v = Dao1901Votes.getVote(voteId, addr);
        votes.push(v[0]);
        addr = v[1];
    }
    return votes;
}

// needs to be called manually for now :'-(
function runMemberTests() {
    assert(Dao1901Members.address, "contract is not deployed");
    assert(Dao1901Members.owner() == alice, "first owner is not contract creator");
    assert(Dao1901Members.head() == 0x00, "members list head is not correctly initialized");

    assert(!Dao1901Members.isMember(bob), "Bob is a DAO member before subscribing");

    // subscribe account 1 for 1 year
    console.log('Owner adds a member...');
    Dao1901Members.subscribe.sendTransaction(bob, 1, {from:alice});
    admin.sleepBlocks(3);
    assert(Dao1901Members.isMember(bob), "Bob is not a DAO member after subscribing");

    // owner revoke a member
    console.log('Owner revokes a member...');
    Dao1901Members.subscribe.sendTransaction(bob, 0, {from:alice}); // Subscription ends now
    admin.sleepBlocks(3);
    assert(!Dao1901Members.isMember(bob), "Bob is still a member after revokation");

    // Retrieve the list of subscribers
    console.log('Owner renews subscription and adds a member...');
    Dao1901Members.subscribe.sendTransaction(bob, 1, {from:alice}); // renew subscription
    Dao1901Members.subscribe.sendTransaction(carol, 1, {from:alice}); // add account 2
    admin.sleepBlocks(3);
    assert(Dao1901Members.isMember(bob), "Bob is not a DAO member after renewal");
    assert(Dao1901Members.isMember(carol), "Carol is not a DAO member after subscribing");

    var members = memberList(Dao1901Members);
    assert(members.length == 2, "Dao should have 2 members");
    assert(members.indexOf(bob) != -1, "Bob should be a member");
    assert(members.indexOf(carol) != -1, "Carol should be a member");

    // Revoke head() and retrieve list
    console.log('Owner revokes head()...');
    Dao1901Members.subscribe.sendTransaction(Dao1901Members.head(), 0, {from:alice});
    admin.sleepBlocks(3);

    var members = memberList(Dao1901Members);
    assert(members.length == 1, "Dao should have 1 members");
    assert(members.indexOf(bob) != -1, "Bob should be a member");
    assert(members.indexOf(carol) == -1, "Carol should not be a member");

    // Accces control
    console.log('Non-owner tries to insert a subscription...');
    Dao1901Members.subscribe.sendTransaction(carol, 10, {from:carol});
    admin.sleepBlocks(3);
    assert(!Dao1901Members.isMember(carol), "non-owners was able to add a member");

    console.log('Non-owner tries to transfer ownership...');
    Dao1901Members.changeOwner.sendTransaction(carol, {from:carol});
    admin.sleepBlocks(3);
    assert(Dao1901Members.owner() == alice, "non-owner was able to transfer ownership");

    // Transfer ownership
    console.log('Owner transfer ownership...');
    Dao1901Members.changeOwner.sendTransaction(bob, {from:alice});
    admin.sleepBlocks(3);
    assert(Dao1901Members.owner() == bob, "ownership was not transfered to Bob");

    // new owner subscribes
    console.log('New owner adds a member...');
    assert(!Dao1901Members.isMember.call(carol), "Carol should not be a member");
    Dao1901Members.subscribe.sendTransaction(carol, 1, {from:bob});
    Dao1901Members.subscribe.sendTransaction(alice, 1, {from:bob});
    admin.sleepBlocks(3);
    assert(Dao1901Members.isMember.call(carol), "Carol was not added by new owner");
    assert(Dao1901Members.isMember.call(alice), "Alice was not added by new owner");

    // Give back ownership of the contract to alice
    console.log('Owner transfer ownership...')
    Dao1901Members.changeOwner.sendTransaction(alice, {from:bob});
    admin.sleepBlocks(3);
    assert(Dao1901Members.owner() == alice, "ownership was not transfered to Bob");


    // At the end of this test:
    // - alice is the owner of the contract
    // - 3 members : bob, carol and alice

    return 'DAO 1901 - Members - OK';
};

function runVoteTests(Dao1901Votes) {
  console.log('voting dao initialization...');
    assert(Dao1901Votes.owner() == alice, 'invalid vote contract owner');
    assert(Dao1901Votes.membersContract() != 0,
           'Vote contract is lacking a members contract');

    Dao1901Members = Dao1901MembersContract.at(Dao1901Votes.membersContract());

    // Make sure alice & bob are the only members
    Dao1901Members.subscribe.sendTransaction(alice, 1, {from:alice});
    Dao1901Members.subscribe.sendTransaction(bob, 1, {from:alice});
    Dao1901Members.subscribe.sendTransaction(carol, 0, {from:alice});
    admin.sleepBlocks(3);

    // non-owner tries to create a proposal
    console.log('non-owner tries to create a proposal...');
    assert(Dao1901Votes.nProposals() == 0, 'vote contract initilized with non zero votes');
    Dao1901Votes.createProposal.sendTransaction('Merguez or Chipo ?', 7, {from:carol});
    admin.sleepBlocks(3);
    assert(Dao1901Votes.nProposals() == 0, 'non owner could create a vote');

    // owner creates a proposal
    console.log('creating a proposal...');
    Dao1901Votes.createProposal.sendTransaction('Merguez or Chipo ?', 7, {from:alice});
    admin.sleepBlocks(3);
    assert(Dao1901Votes.nProposals() == 1, 'proposal creation failed');
    assert(Dao1901Votes.proposals(1)[0] == 'Merguez or Chipo ?',
           'proposal description incorrect');

    // carol tries to vote
    console.log('simple vote...');
    Dao1901Votes.vote.sendTransaction(1, 'Chipo', {from:alice});
    Dao1901Votes.vote.sendTransaction(1, 'Merguez', {from:bob});
    Dao1901Votes.vote.sendTransaction(1, 'Brochette', {from:carol});
    admin.sleepBlocks(3);
    var votes = voteList(Dao1901Votes, 1);
    assert(votes.length == 2, "Vote 1 should have 2 votes")
    assert(votes.indexOf('Merguez') != -1, "Merguez vote not recorded")
    assert(votes.indexOf('Chipo') != -1, "Chipo vote not recorded")

    // voting twice updates the previous vote
    console.log('update vote...');
    Dao1901Votes.createProposal.sendTransaction('Fork or Fork ?', 7, {from:alice});
    admin.sleepBlocks(3);
    Dao1901Votes.vote.sendTransaction(2, 'Fork', {from:alice});
    Dao1901Votes.vote.sendTransaction(2, 'Fork', {from:bob});
    admin.sleepBlocks(3);
    Dao1901Votes.vote.sendTransaction(2, 'No Fork', {from:alice});
    admin.sleepBlocks(3);

    votes = voteList(Dao1901Votes, 2);
    assert(votes.indexOf('No Fork') != -1, "alice vote was not updated");

    // expired vote
    console.log('expired vote...');
    Dao1901Votes.createProposal.sendTransaction(
        'gege, pense aux cles du camion', 0, {from:alice});
    admin.sleepBlocks(3);
    Dao1901Votes.vote.sendTransaction(3, 'foo', {from:alice});
    Dao1901Votes.vote.sendTransaction(3, 'bar', {from:bob});
    admin.sleepBlocks(3);
    votes = voteList(Dao1901Votes, 3);
    assert(votes.length == 0, "vote was not expired");

    // empty choice is invalid
    console.log('empty choice...');
    Dao1901Votes.createProposal.sendTransaction('eggs, bacon or spam ?', 7, {from:alice});
    admin.sleepBlocks(3);
    Dao1901Votes.vote.sendTransaction(4, '', {from:alice});
    assert(votes.length == 0, "empty choice was accepted");

    // list proposals
    console.log('listing proposals...');
    for (var i = 1; i <= Dao1901Votes.nProposals(); i++) {
        assert(Dao1901Votes.proposals(i)[1] != 0, 'invalid proposal')
    }

    return 'DAO 1901 - Votes - OK';
}
