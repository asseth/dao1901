pragma solidity ^0.4.4;

import "./Owned.sol";
import "./Dao1901Members.sol";

contract Dao1901Votes is Owned {

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
