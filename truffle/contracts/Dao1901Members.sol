contract Dao1901Members {

  address public owner;
  address public head;

  struct node {
    uint end;
    address next;
  }

  mapping (address => node) public subscriptions;

  function Dao1901Members() {
    head = msg.sender;          /* First member is the creator */
    owner = msg.sender;

    subscriptions[owner].end = now + 3 years;
  }

  modifier ownerOnly() {
    if (msg.sender != owner) throw;
    _
  }

  function subscribe(address _member, uint duration) ownerOnly {
    if (subscriptions[_member] == 0) {
      subscriptions[_head].next = _member;
      head = _member;
    }
    subscriptions[_member].end = now + duration;
  }

  function canVote(address _member) returns bool {
    var sub = subscriptions[_member];
    if (sub == 0 || sub.end == 0) return false;
    return sub.end >= now;
  }

}
