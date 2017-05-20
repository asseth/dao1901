let Dao1901Members = artifacts.require("Dao1901Members");
let Dao1901Votes = artifacts.require("Dao1901Votes");
let Owned = artifacts.require("Owned");

module.exports = (deployer) => {
  deployer.deploy(Owned)
    .then(() => console.log(`Owned has been deployed at: ${Owned.address}`))
    .then(() => deployer.deploy(Dao1901Members))
    .then(() => console.log(`Dao1901Members has been deployed at: ${Dao1901Members.address}`))
    .then(() => deployer.deploy(Dao1901Votes, Dao1901Members.address))
    .then(() => console.log(`Dao1901Votes has been deployed at: ${Dao1901Votes.address}`))
};
