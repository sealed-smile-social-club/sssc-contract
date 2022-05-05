const SSSC = artifacts.require("MintSSSC");
const PublicSaleSSSC = artifacts.require("PublicSaleSSSC");
const WhitelistSaleSSSC = artifacts.require("WhitelitSaleSSSC");
const AirdropSSSC = artifacts.require("AirdropSSSC");

module.exports = function (deployer) {
  deployer
    .deploy(
      MintSSSC,
      "Sealed Smile Social Club",
      "SSSC",
      "https://sssc.boutique/metadata/",
      "https://sssc.boutique/metadata/"
    )
    .then(() => SSSC.deployed())
    .then(() => deployer.deploy(WhitelistSaleSSSC, SSSC.address))
    .then(() => WhitelistSaleSSSC.deployed())
    .then(() => deployer.deploy(PublicSaleSSSC, SSSC.address))
    .then(() => PublicSaleSSSC.deployed())
    .then(() => deployer.deploy(AirdropSSSC, SSSC.address))
    .then(() => AirdropSSSC.deployed())
    .catch(e => Promise.reject(new Error('Mint deployer failed. Error:', e)))
};
