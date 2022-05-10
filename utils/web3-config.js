const { Wallet, getDefaultProvider } = require('ethers');
const Web3 = require('web3');

const SSSCAbi = require('../build/contracts/SSSC.json').abi;
const publicSaleSSSCAbi = require('../build/contracts/PublicSaleSSSC.json').abi;
const whitelistSaleSSSCAbi = require('../build/contracts/WhitelistSaleSSSC.json').abi;
const airdropSSSCAbi = require('../build/contracts/AirdropSSSC.json').abi;

const web3 = new Web3(process.env.PROVIDER_ENDPOINT);

const ssscContract = () => new web3.eth.Contract(
  SSSCAbi,
  process.env.SSSC_ADDRESS
);

const publicSaleSSSCContract = () => new web3.eth.Contract(
  publicSaleSSSCAbi,
  process.env.PUBLIC_SALE_SSSC_ADDRESS
);

const whitelistSaleSSSCContract = () => new web3.eth.Contract(
  whitelistSaleSSSCAbi,
  process.env.WHITELIST_SALE_SSSC_ADDRESS
);

const airdropSSSCContract = () => new web3.eth.Contract(
  airdropSSSCAbi,
  process.env.AIRDROP_SSSC_ADDRESS
);

const createSignerFromMnemonics = (mnemonics, network) => {
  return Wallet.fromMnemonic(mnemonics).connect(getDefaultProvider(network));
}

const createSignerFromPrivateKey = (privateKey, network) => {
  return new Wallet(privateKey).connect(getDefaultProvider(network));
}

module.exports = {
  ssscContract,
  publicSaleSSSCContract,
  whitelistSaleSSSCContract,
  airdropSSSCContract,

  createSignerFromMnemonics,
  createSignerFromPrivateKey
}