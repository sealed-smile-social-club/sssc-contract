const {
  ssscContract,
  createSignerFromMnemonics,
  createSignerFromPrivateKey,
} = require('./web3-config');

// const a = await ssscContract.methods.paused().call();

const initialize = async () => {
  const a = await ssscContract.methods.paused().call();
}

(async function() {
  try {
    await initialize();
  } catch (e) {
    console.log(e);  
  }
})();