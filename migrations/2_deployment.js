const MintSSSC = artifacts.require("MintSSSC");
const SaleSSSC = artifacts.require("SaleSSSC");

module.exports = function (deployer) {
  deployer
    .deploy(
      MintSSSC,
      "Sealed Smile Social Club",
      "SSSC",
      "https://sssc.boutique/metadata/",
      "https://sssc.boutique/metadata/"
    )
    .then(() => MintSSSC.deployed())
    .then(() => deployer.deploy(SaleSSSC, MintSSSC.address))
    .then(() => SaleSSSC.deployed())
    .catch(e => Promise.reject(new Error('Mint deployer failed. Error:', e)))
};
