import * as GenericAPI from '../api/eth-generic';

import SSSC_ARTIFACT from '../../build/contracts/SSSC.json';
import AIRDROP_SSSC_ARTIFACT from '../../build/contracts/AirdropSSSC.json';

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
	const airdropSsscAddress = process.env.AIRDROP_SSSC_ADDRESS!;
	const airdropSsscAbi = AIRDROP_SSSC_ARTIFACT.abi;
	const airdropSsscContract = GenericAPI.getContractByInterface(
		airdropSsscAddress,
		airdropSsscAbi,
		signer
	);
	
	await GenericAPI.writeContract(ssscContract, 'addOwner(address)', { guest: airdropSsscAddress }, {
		gasPrice: 30,
		gasLimit: 1000000,
		confirmations: 1
	});

	await GenericAPI.writeContract(airdropSsscContract, 'setMintCount(uint256)', { mintCount: 1 }, {
		gasPrice: 30,
		gasLimit: 1000000,
		confirmations: 1
	});

	await GenericAPI.writeContract(airdropSsscContract, 'airDropMint(address,uint256)', { target: await signer.getAddress(), requestedCount: 1 }, {
		gasPrice: 30,
		gasLimit: 1000000,
		confirmations: 1
	});
	
	const res = await GenericAPI.readContract(ssscContract, 'totalSupply()', {});
	console.log(res);
}

(async function() {
  try {
    await initialize();
  } catch (e) {
    console.log(e);  
  }
})();