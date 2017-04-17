let Dao1901Members = artifacts.require("Dao1901Members");
let Dao1901Votes = artifacts.require("Dao1901Votes");
let Owned = artifacts.require("Owned");

module.exports = (deployer) => {
  deployer.deploy(Owned);
  deployer.deploy(Dao1901Members)
    .then(() => deployer.deploy(Dao1901Votes, Dao1901Members.address));
};
