const SSSC = artifacts.require("SSSC");
const PublicSaleSSSC = artifacts.require("PublicSaleSSSC");
const WhitelistSaleSSSC = artifacts.require("WhitelistSaleSSSC");
const AirdropSSSC = artifacts.require("AirdropSSSC");

module.exports = function (deployer) {
  deployer
    .deploy(
      SSSC,
      "Sealed Smile Social Club",
      "SSSC",
      "https://resource.sssc.boutique/metadata/",
      "https://resource.sssc.boutique/not-revealed/"
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
