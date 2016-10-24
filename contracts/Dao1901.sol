pragma solidity ^0.4.2;
contract owned {
  /* The owner of the contract can add members and transfer ownership.
     initial value is the contract creator */
  address public owner = msg.sender;

  modifier ownerOnly() {
    if (msg.sender != owner) throw;
    _;
  }

  /* transfer DAO1901 ownership */
  function changeOwner(address _newOwner) ownerOnly {
    owner = _newOwner;
  }

}

contract Dao1901Members is owned {

  address public head;          /* linked list */

  /* subscription entry */
  struct Sub {
    uint end;                   /* time at which subscription ends */
    address next;
  }

  /* subscription storage.

     The list of the DAO1901 members can be constructed like this :

     addr = head
     members = []
     while True:
         if isMember(addr):
             members.append(addr)
         addr = subscriptions[addr].next
         if addr == 0x00:
           break

   */
  mapping (address => Sub) public subscriptions;

  /* Check that a given address is subscribed to the DAO1901 */
  function isMember(address _member) returns (bool) {
    return subscriptions[_member].end >= now;
  }

  modifier ownerOnly() {
    if (msg.sender != owner) throw;
    _;
  }

  /* add / update (i.e. renew )the subscription of a member for a given
     number of years */
  function subscribe(address _member, uint _yearsDuration) ownerOnly {
    if (subscriptions[_member].end == 0) { /* first subscription */
      subscriptions[_member].next = head;
      head = _member;
    }
    subscriptions[_member].end = now + _yearsDuration * 1 years;
  }

}

contract Dao1901Votes is owned {

  /* Address of the contract that implements :
         function isMember(address addr) returns (bool)
  */
  Dao1901Members public membersContract;

  function Dao1901Votes(address _membersContract) {
    membersContract = Dao1901Members(_membersContract);
  }

  struct Vote {
    string choice;
    address next;
  }

  /* Proposal entry */
  struct Proposal {
    string description;              /* human-readable description of the proposal */
    uint deadline;                   /* time at which  the votes ends */
    address head;                    /* linked list of voters */
    mapping (address => Vote) votes; /* actual members votes storage */
  }

  uint public nVotes;           /* Number of votes created */
  mapping (uint => Proposal) public proposals;

  function createProposal(string _description, uint _daysUntilDeadline)
    ownerOnly returns (uint)
  {
    nVotes = nVotes + 1; // we don't want to use index 0
    proposals[nVotes].description = _description;
    proposals[nVotes].deadline = now + _daysUntilDeadline * 1 days;
    return nVotes;
  }

  function vote(uint _voteId, string _choice) {
    /* XXX check gas value */
    if(!membersContract.isMember.gas(1000)(msg.sender)) throw;

    /* Invalid proposal id */
    if (_voteId == 0 || _voteId > nVotes) throw;

    var prop = proposals[_voteId];

    /* Voting has ended */
    if(prop.deadline < now) throw;

    /* Empty choice is invalid, we use it to identify new votes */
    if (bytes(_choice).length == 0) throw;

    if (bytes(prop.votes[msg.sender].choice).length == 0) {
      prop.votes[msg.sender].next = prop.head;
      prop.head = msg.sender;
    }
    prop.votes[msg.sender].choice = _choice;
  }

  function getVote(uint _voteId, address _voter)
    constant returns (string, address)
  {
    var vote = proposals[_voteId].votes[_voter];
    return (vote.choice, vote.next);
  }

}
