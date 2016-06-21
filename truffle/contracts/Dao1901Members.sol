contract Dao1901Members {

  address public owner = msg.sender;

  address public head;

  /* subscription entry */
  struct sub {
    uint end;                   /* time at which subscription ends */
    address next;               /* linked list */
  }

  mapping (address => sub) public subscriptions;

  modifier ownerOnly() {
    if (msg.sender != owner) throw;
    _
  }

  function subscribe(address _member, uint _yearsDuration) ownerOnly {
    if (subscriptions[_member].end == 0) { /* first subscription */
      subscriptions[_member].next = head;
      head = _member;
    }
    subscriptions[_member].end = now + _yearsDuration * 1 years;
  }

  function changeOwner(address _newOwner) ownerOnly {
    owner = _newOwner;
  }

  function canVote(address _member) returns (bool) {
    return subscriptions[_member].end >= now;
  }

}
