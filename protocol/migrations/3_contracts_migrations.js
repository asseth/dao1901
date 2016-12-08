module.exports = function(deployer) {
  deployer.deploy(Dao1901Members).then(function() {
    return deployer.deploy(Dao1901Votes, Dao1901Members.address);
  });
};
