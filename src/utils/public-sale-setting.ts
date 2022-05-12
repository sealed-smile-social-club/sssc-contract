import * as GenericAPI from '../api/eth-generic';

import SSSC_ARTIFACT from '../../build/contracts/SSSC.json';
import PUBLICSALE_SSSC_ARTIFACT from '../../build/contracts/PublicSaleSSSC.json';

const initialize = async () => {
	const signer = GenericAPI.createSignerFromPrivateKey(
		process.env.PRIVATE_KEY!, 
		process.env.PROVIDER_ENDPOINT!
	);
	const ssscAddress = process.env.SSSC_ADDRESS!;
	const ssscAbi = SSSC_ARTIFACT.abi;
	const ssscContract = GenericAPI.getContractByInterface(
		ssscAddress,
		ssscAbi,
		signer
	);
	const publicSaleSsscAddress = process.env.PUBLICSALE_SSSC_ADDRESS!;
	const publicSaleSsscAbi = PUBLICSALE_SSSC_ARTIFACT.abi;
	const publicSaleSssscContract = GenericAPI.getContractByInterface(
		publicSaleSsscAddress,
		publicSaleSsscAbi,
		signer
	);
}

(async function() {
  try {
    await initialize();
  } catch (e) {
    console.log(e);  
  }
})();