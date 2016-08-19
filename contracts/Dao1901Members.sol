import "Owned.sol";

contract Dao1901Members is Owned {

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
    _
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