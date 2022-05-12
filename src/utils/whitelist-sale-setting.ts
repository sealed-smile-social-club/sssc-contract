import * as GenericAPI from '../api/eth-generic';

import SSSC_ARTIFACT from '../../build/contracts/SSSC.json';
import WHITELISTSALE_SSSC_ARTIFACT from '../../build/contracts/WhitelistSaleSSSC.json';

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
	const whitelistSaleSsscAddress = process.env.WHITELISTSALE_SSSC_ADDRESS!;
	const whitelistSaleSsscAbi = WHITELISTSALE_SSSC_ARTIFACT.abi;
	const whitelistSaleSssscContract = GenericAPI.getContractByInterface(
		whitelistSaleSsscAddress,
		whitelistSaleSsscAbi,
		signer
	);

  // 머클 프루프 등록
}

(async function() {
  try {
    await initialize();
  } catch (e) {
    console.log(e);  
  }
})();