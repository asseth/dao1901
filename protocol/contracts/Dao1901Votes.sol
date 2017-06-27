pragma solidity ^0.4.4;

import "./Owned.sol";
import "./Dao1901Members.sol";

contract Dao1901Votes is Owned {
  Dao1901Members public membersContract;

  function Dao1901Votes(address _membersContract) {
    membersContract = Dao1901Members(_membersContract);
  }

  // Debug events
  event LogString(string str);
  event LogAddress(address addr);
  event LogBool(bool boo);
  event LogBytes(bytes b);

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

  uint public nProposals;            /* Number of proposals created */
  mapping (uint => Proposal) public proposals;

  function createProposal(string _description, uint _daysUntilDeadline)
    ownerOnly returns (uint)
  {
    nProposals = nProposals + 1; // incr. index, we don't want to use index 0
    proposals[nProposals].description = _description;
    proposals[nProposals].deadline = now + _daysUntilDeadline * 1 days;
    return nProposals;
  }

  function vote(uint _propId, string _choice) {
    //LogString(_choice);
    //LogAddress(msg.sender);
    LogAddress(membersContract);

    // todo: check gas value
    if(!membersContract.isMember.gas(2000)(msg.sender)) throw;

    /* Invalid proposal id */
    if (_propId == 0 || _propId > nProposals) throw;

    var prop = proposals[_propId];

    /* Voting has ended */
    if(prop.deadline < now) throw;

    /* Empty choice is invalid, we use it to identify new votes */
    if (bytes(_choice).length == 0) throw;

    // If the person has never voted for this proposal
    if (bytes(prop.votes[msg.sender].choice).length == 0) {
      prop.votes[msg.sender].next = prop.head;
      prop.head = msg.sender;
    }
    prop.votes[msg.sender].choice = _choice;
  }

  function getVote(uint _propId, address _voter)
    constant returns (string, address)
  {
    var vote = proposals[_propId].votes[_voter];
    return (vote.choice, vote.next);
  }
}
