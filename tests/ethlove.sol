contract EthLove {
  mapping (address => address) public links;

  function EthLove() {}

  function link(address with) {
    if (links[msg.sender] != 0) throw;
    links[msg.sender] = with;
  }

  function areLinked(address a, address b) returns (bool) {
    return (links[a] == b && links[b] == a);
  }
}
