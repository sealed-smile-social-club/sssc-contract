import * as GenericAPI from '../src/api/eth-generic';
import { 
  getMerkleTree,
  getMerkleTreeProof,
  getMerkleTreeRoot
 } from '../src/utils/merkle-tree';

import SSSC_ARTIFACT from '../build/contracts/SSSC.json';
import PUBLICSALE_SSSC_ARTIFACT from '../build/contracts/PublicSaleSSSC.json';
import WHITELISTSALE_SSSC_ARTIFACT from '../build/contracts/WhitelistSaleSSSC.json';
import AIRDROP_SSSC_ARTIFACT from '../build/contracts/AirdropSSSC.json';

const ssscAddress = SSSC_ARTIFACT.networks[5777].address!;
const ssscAbi = SSSC_ARTIFACT.abi;
const whitelistSaleSsscAddress = WHITELISTSALE_SSSC_ARTIFACT.networks[5777].address!;
const whitelistSaleSsscAbi = WHITELISTSALE_SSSC_ARTIFACT.abi;
const publicSaleSsscAddress = PUBLICSALE_SSSC_ARTIFACT.networks[5777].address!;
const publicSaleSsscAbi = PUBLICSALE_SSSC_ARTIFACT.abi;
const airdropSsscAddress = AIRDROP_SSSC_ARTIFACT.networks[5777].address!;
const airdropSsscAbi = AIRDROP_SSSC_ARTIFACT.abi;

const owner = GenericAPI.createSignerFromPrivateKey(
  process.env.PRIVATE_KEY!, 
  process.env.PROVIDER_ENDPOINT!
);
const notOwner = GenericAPI.createSignerFromPrivateKey(
  process.env.NO_PK!, 
  process.env.PROVIDER_ENDPOINT!
);

const authrizedSsscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, owner);
const authrizedWhitelistSaleSsscContract = GenericAPI.getContractByInterface(whitelistSaleSsscAddress, whitelistSaleSsscAbi, owner);
const authrizedPublicSaleSsscContract = GenericAPI.getContractByInterface(publicSaleSsscAddress, publicSaleSsscAbi, owner);
const authrizedAirdropSsscContract = GenericAPI.getContractByInterface(airdropSsscAddress, airdropSsscAbi, owner);
const notAuthrizedSsscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, notOwner);
const notAuthrizedWhitelistSaleSsscContract = GenericAPI.getContractByInterface(whitelistSaleSsscAddress, whitelistSaleSsscAbi, notOwner);
const notAuthrizedPublicSaleSsscContract = GenericAPI.getContractByInterface(publicSaleSsscAddress, publicSaleSsscAbi, notOwner);
const notAuthrizedAirdropSsscContract = GenericAPI.getContractByInterface(airdropSsscAddress, airdropSsscAbi, notOwner);

describe('Mint Contract', () => {
  const tokenId = Math.floor((Math.random() * (2501 - 1)) + 1);

  beforeAll(async () => {});

  test('owner??? ?????? ???????????? addOwner??? ???????????? revert??? ??????.', async () => {  
    try {
      await GenericAPI.writeContract(notAuthrizedSsscContract, 'addOwner(address)', { guest: await notOwner.getAddress() }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      })

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message.search('Ownable: caller is not the owner')).not.toBe(-1);
    }
  })

  test('owner??? ?????? ???????????? removeOwner??? ???????????? revert??? ??????.', async () => {  
    try {
      await GenericAPI.writeContract(notAuthrizedSsscContract, 'removeOwner(address)', { owner: await notOwner.getAddress() }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message.search('Ownable: caller is not the owner')).not.toBe(-1);
    }
  })

  test('owner??? ?????? ???????????? setBaseURI ???????????? revert??? ??????.', async () => {  
    try {
      await GenericAPI.writeContract(notAuthrizedSsscContract, 'setBaseURI(string)', { baseTokenURI: 'https://test-uri.com' }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message.search('Ownable: caller is not the owner')).not.toBe(-1);
    }
  })

  test('owner??? ?????? ???????????? setNotRevealedURI??? ???????????? revert??? ??????.', async () => {  
    try {
      await GenericAPI.writeContract(notAuthrizedSsscContract, 'setNotRevealedURI(string)', { newNotRevealedURI: 'https://test-uri.com' }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message.search('Ownable: caller is not the owner')).not.toBe(-1);
    }
  })

  test('owner??? ?????? ???????????? setRevealed??? ???????????? revert??? ??????.', async () => {  
    try {
      await GenericAPI.writeContract(notAuthrizedSsscContract, 'setRevealed(bool)', { state: true }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message.search('Ownable: caller is not the owner')).not.toBe(-1);
    }
  })

  test('owner??? ?????? ???????????? mint??? ???????????? revert??? ??????.', async () => {  
    try {
      await GenericAPI.writeContract(notAuthrizedSsscContract, 'mint(address,uint256)', { to: await notOwner.getAddress(), tokenId: tokenId }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message.search('Ownable: caller is not the owner')).not.toBe(-1);
    }
  })

  test('owner??? ?????? ???????????? pause??? ???????????? revert??? ??????.', async () => {  
    try {
      await GenericAPI.writeContract(notAuthrizedSsscContract, 'pause()', {}, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message.search('Ownable: caller is not the owner')).not.toBe(-1);
    }
  })

  test('owner??? ?????? ???????????? unpause??? ???????????? revert??? ??????.', async () => {  
    try {
      await GenericAPI.writeContract(notAuthrizedSsscContract, 'unpause()', {}, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message.search('Ownable: caller is not the owner')).not.toBe(-1);
    }
  })

  test('owner??? ????????? ????????????, ????????? ??????.', async () => {  
    await GenericAPI.writeContract(authrizedSsscContract, 'mint(address,uint256)', { to: await owner.getAddress(), tokenId: tokenId }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res = await GenericAPI.readContract(authrizedSsscContract, 'ownerOf(uint256)', { tokenId: tokenId });
    const expectedRes = await owner.getAddress();

    expect(res).toBe(expectedRes);
  })

  test('revealed??? false ??? ???, tokenURI notRevealedURI??? ????????? URI??? ?????? ??????.', async () => {
    await GenericAPI.writeContract(authrizedSsscContract, 'setRevealed(bool)', { state: false }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res = await GenericAPI.readContract(authrizedSsscContract, 'tokenURI(uint256)', { tokenId: tokenId });
    const expectedRes = `https://resource.sssc.boutique/not-revealed/metadata.json`;

    expect(res).toBe(expectedRes);
  })

  test('revealed??? true ??? ???, tokenURI baseToeknURI??? ????????? URI??? ?????? ??????.', async () => {
    await GenericAPI.writeContract(authrizedSsscContract, 'setRevealed(bool)', { state: true }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res = await GenericAPI.readContract(authrizedSsscContract, 'tokenURI(uint256)', { tokenId: tokenId });
    const expectedRes = `https://resource.sssc.boutique/metadata/${tokenId}.json`;

    expect(res).toBe(expectedRes);
  })

  test('paused??? ???, ?????? ????????? ???????????????.', async () => {
    try {
      await GenericAPI.writeContract(authrizedSsscContract, 'pause()', {}, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      await GenericAPI.writeContract(authrizedSsscContract, 'transferFrom(address,address,uint256)', { from: await owner.getAddress(), to: await notOwner.getAddress(), tokenId: tokenId }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message.search('Pausable: paused')).not.toBe(-1);
    }
  })

  test('unpaused??? ???, ?????? ????????? ????????????.', async () => {
      await GenericAPI.writeContract(authrizedSsscContract, 'unpause()', {}, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      await GenericAPI.writeContract(authrizedSsscContract, 'transferFrom(address,address,uint256)', { from: await owner.getAddress(), to: await notOwner.getAddress(), tokenId: tokenId }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      const res = await GenericAPI.readContract(authrizedSsscContract, 'ownerOf(uint256)', { tokenId: tokenId });
      const expectedRes = await notOwner.getAddress();

      expect(res).toBe(expectedRes);
  })
})

describe('WhitelistSale Contract', () => {
  const mintCount = Math.floor((Math.random() * (5001 - 2501)) + 2501);
  const mintStartTime = Math.floor(new Date('2022-09-30 17:00:00').getTime() / 1000);
  const mintEndTime = Math.floor(new Date('2022-10-30 17:00:00').getTime() / 1000);
  const onMintStartTime = Math.floor(new Date('2022-05-30 17:00:00').getTime() / 1000);
  const onMintEndTime = Math.floor(new Date('2023-05-30 17:00:00').getTime() / 1000);
  const mintLimitPerBlock = 5;
  const maxSaleAmount = 7500;
  const mintPrice = 1000000000000000;

  const merkleTree = getMerkleTree([
    '0x39f5aBE579291234f76A76B843eFa03968dc82D1',
  ]);

  beforeAll(async () => {
    await GenericAPI.writeContract(authrizedSsscContract, 'addOwner(address)', { guest: whitelistSaleSsscAddress }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });
  });

  test('setWhitelistSaleInfo??? ????????????, ?????? ????????? ????????????.', async () => {
    await GenericAPI.writeContract(authrizedWhitelistSaleSsscContract, 'setWhitelistSaleInfo(uint256,uint256,uint256,uint256,uint256,uint256)', 
    { 
      mintCount: mintCount,
      mintLimitPerBlock: mintLimitPerBlock,
      mintStartTime: mintStartTime,
      mintEndTime: mintEndTime,
      maxSaleAmount: maxSaleAmount,
      mintPrice: mintPrice, // 0.001ETH
    }, 
    {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res = await GenericAPI.readContract(notAuthrizedWhitelistSaleSsscContract, 'getWhitelistSaleInfo()', {});
    const expectedRes = [mintCount, mintLimitPerBlock, mintStartTime, mintEndTime, maxSaleAmount, mintPrice].map(a => a.toString());
    
    expect(res).toStrictEqual(expectedRes);
  })

  test('setWhitelistMintEnabled??? ????????????, ?????? ?????? ???????????? ????????? ??? ??????.', async () => {
    await GenericAPI.writeContract(authrizedWhitelistSaleSsscContract, 'setWhitelistMintEnabled(bool)', { state: false }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res = await GenericAPI.readContract(authrizedWhitelistSaleSsscContract, 'getWhitelitMintEnabled()', {});
    const expectedRes = false;

    expect(res).toBe(expectedRes);
  })

  test('setMerkleRoot??? ????????????, ??????????????? ?????? ??? ??? ??????.', async () => {
    await GenericAPI.writeContract(authrizedWhitelistSaleSsscContract, 'setMerkleRoot(bytes32)', { merkleRoot: `0x${getMerkleTreeRoot(merkleTree)}` }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res = await GenericAPI.readContract(authrizedWhitelistSaleSsscContract, 'getMerkleRoot()', {});
    const expectedRes = `0x${getMerkleTreeRoot(merkleTree)}`;

    expect(res).toBe(expectedRes);
  })

  test('?????? ?????? ????????????, false ?????? ????????? ???????????? revert??? ??????.', async () => {
    try {
      await GenericAPI.writeContract(authrizedWhitelistSaleSsscContract, 'setWhitelistMintEnabled(bool)', { state: false }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });
  
      await GenericAPI.writeContract(notAuthrizedWhitelistSaleSsscContract, 'whitelistMint(uint256,bytes32[])', { requestedCount: 1, merkleProof: getMerkleTreeProof(merkleTree, await notOwner.getAddress()) }, {
        value: 1000000000000000,
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message.search('The whitelist sale is not enabled!')).not.toBe(-1);
    }
  })

  test('?????? ????????? ?????????, ????????? ???????????? revert??? ??????.', async () => {
    try {  
      await GenericAPI.writeContract(authrizedWhitelistSaleSsscContract, 'setWhitelistMintEnabled(bool)', { state: true }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      await GenericAPI.writeContract(notAuthrizedWhitelistSaleSsscContract, 'whitelistMint(uint256,bytes32[])', { requestedCount: 1, merkleProof: getMerkleTreeProof(merkleTree, await notOwner.getAddress()) }, {
        value: 1000000000000000,
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message.search('This is not the sale period')).not.toBe(-1);
    }
  })

  test('????????? ?????? ?????? ?????? ????????? ??????????????? 0????????? ????????? ????????? revert??? ??????.', async () => {
    try {  
      await GenericAPI.writeContract(authrizedWhitelistSaleSsscContract, 'setWhitelistSaleInfo(uint256,uint256,uint256,uint256,uint256,uint256)', 
      { 
        mintCount: 5200,
        mintLimitPerBlock: mintLimitPerBlock,
        mintStartTime: onMintStartTime,
        mintEndTime: onMintEndTime,
        maxSaleAmount: maxSaleAmount,
        mintPrice: mintPrice, // 0.001ETH
      }, 
      {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      await GenericAPI.writeContract(notAuthrizedWhitelistSaleSsscContract, 'whitelistMint(uint256,bytes32[])', { requestedCount: 6, merkleProof: getMerkleTreeProof(merkleTree, await notOwner.getAddress()) }, {
        value: 1000000000000000,
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed')
    } catch (e: any) {
      expect(e.message.search('Too many requests or zero request')).not.toBe(-1);
    }
  })

  test('salePrice??? ????????? ???????????? ????????? ???????????? revert??? ??????.', async () => {
    try {
      await GenericAPI.writeContract(authrizedWhitelistSaleSsscContract, 'setWhitelistSaleInfo(uint256,uint256,uint256,uint256,uint256,uint256)', 
      { 
        mintCount: mintCount,
        mintLimitPerBlock: mintLimitPerBlock,
        mintStartTime: onMintStartTime,
        mintEndTime: onMintEndTime,
        maxSaleAmount: maxSaleAmount,
        mintPrice: mintPrice, // 0.001ETH
      }, 
      {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      await GenericAPI.writeContract(notAuthrizedWhitelistSaleSsscContract, 'whitelistMint(uint256,bytes32[])', { requestedCount: 1, merkleProof: getMerkleTreeProof(merkleTree, await notOwner.getAddress()) }, {
        value: 5500,
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed')
    } catch (e: any) {
      expect(e.message.search('Not correct ETH')).not.toBe(-1);
    }
  })

  test('?????? ????????? ?????? ?????? ?????? ?????? ????????? ???????????? revert??? ??????.', async () => {
    try {  
      await GenericAPI.writeContract(authrizedWhitelistSaleSsscContract, 'setWhitelistSaleInfo(uint256,uint256,uint256,uint256,uint256,uint256)', 
      { 
        mintCount: 7500,
        mintLimitPerBlock: mintLimitPerBlock,
        mintStartTime: onMintStartTime,
        mintEndTime: onMintEndTime,
        maxSaleAmount: maxSaleAmount,
        mintPrice: mintPrice, // 0.001ETH
      }, 
      {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      await GenericAPI.writeContract(notAuthrizedWhitelistSaleSsscContract, 'whitelistMint(uint256,bytes32[])', { requestedCount: 2, merkleProof: getMerkleTreeProof(merkleTree, await notOwner.getAddress()) }, {
        value: 2000000000000000,
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed')
    } catch (e: any) {
      expect(e.message.search('Exceed max amount')).not.toBe(-1);
    }
  })

  test('??????????????????(???????????????)??? ???????????? ?????? ???????????? ????????? ???????????? revert??? ??????.', async () => {
    try {  
      await GenericAPI.writeContract(authrizedWhitelistSaleSsscContract, 'whitelistMint(uint256,bytes32[])', { requestedCount: 1, merkleProof: getMerkleTreeProof(merkleTree, await owner.getAddress()) }, {
        value: 1000000000000000,
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed')
    } catch (e: any) {
      expect(e.message.search('Invalid proof!')).not.toBe(-1);
    }
  })

  test('??????????????????(???????????????)??? ????????? ???????????? ????????? ???????????? ????????? ??????.', async () => {
    await GenericAPI.writeContract(authrizedWhitelistSaleSsscContract, 'setWhitelistSaleInfo(uint256,uint256,uint256,uint256,uint256,uint256)', 
    { 
      mintCount: mintCount,
      mintLimitPerBlock: mintLimitPerBlock,
      mintStartTime: onMintStartTime,
      mintEndTime: onMintEndTime,
      maxSaleAmount: maxSaleAmount,
      mintPrice: mintPrice, // 0.001ETH
    }, 
    {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    await GenericAPI.writeContract(notAuthrizedWhitelistSaleSsscContract, 'whitelistMint(uint256,bytes32[])', { requestedCount: 1, merkleProof: getMerkleTreeProof(merkleTree, await notOwner.getAddress()) }, {
      value: 1000000000000000,
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res = await GenericAPI.readContract(authrizedSsscContract, 'ownerOf(uint256)', { tokenId: mintCount });
    const expectedRes = await notOwner.getAddress();

    expect(res).toBe(expectedRes);
  })

  test('?????? ????????? ???????????? ???????????? ????????? ???????????? revert??? ??????.', async () => {
    try {  
      await GenericAPI.writeContract(notAuthrizedWhitelistSaleSsscContract, 'whitelistMint(uint256,bytes32[])', { requestedCount: 1, merkleProof: getMerkleTreeProof(merkleTree, await notOwner.getAddress()) }, {
        value: 1000000000000000,
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed')
    } catch (e: any) {
      expect(e.message.search('Address already claimed!')).not.toBe(-1);
    }
  })

  test('?????? ?????????, ?????????????????? ?????? ETH??? ????????? ???????????? ?????? ??????.', async () => {
    expect(true);
  })
})

describe('PublicSale Contract', () => {
  const mintCount = Math.floor((Math.random() * (7501 - 5001)) + 5001);

  // beforeAll(async () => {
  //   await GenericAPI.writeContract(authrizedSsscContract, 'addOwner(address)', { guest: publicSaleSsscAddress }, {
  //     gasPrice: 30,
  //     gasLimit: 1000000,
  //     confirmations: 1
  //   });
  // });

  /**
   * Antibot ????????? ????????? ?????? ????????? WhitelistSale??? ????????? ??????????????????, ??????????????? ?????? ??? ????????? v0.2?????? ???????????? ???????????? ????????? ??????.
   */
})

describe('Airdrop Contract', () => {
  const mintCount = Math.floor((Math.random() * (10001 - 7501)) + 7501);

  
  beforeAll(async () => {
    await GenericAPI.writeContract(authrizedSsscContract, 'addOwner(address)', { guest: airdropSsscAddress }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });
  });

  test('owner??? ?????? ???????????? setMintCount??? ???????????? revert??? ??????.', async () => {  
    try {
      await GenericAPI.writeContract(notAuthrizedAirdropSsscContract, 'setMintCount(uint256)', { mintCount: mintCount }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.');
    } catch (e: any) {
      expect(e.message).not.toBe('The trasaction have passed.');
    }
  })

  test('mintCount??? 0??????, airdropMint??? ???????????? revert??? ??????.', async () => {  
    try {
      await GenericAPI.writeContract(authrizedAirdropSsscContract, 'setMintCount(uint256)', { mintCount: 0 }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      await GenericAPI.writeContract(authrizedAirdropSsscContract, 'airdropMint(address,uint256)', { target: await notOwner.getAddress(), requestedCount: 1 }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message.search('Setup MintCount')).not.toBe(-1);
    }
  })

  test('owner ???????????? setMintCount??? ????????????, mintCount??? ?????? ??????. (mintCount = tokenId)', async () => {  
    await GenericAPI.writeContract(authrizedAirdropSsscContract, 'setMintCount(uint256)', { mintCount: mintCount }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res: string = await GenericAPI.readContract(authrizedAirdropSsscContract, 'getMintCount()', {});

    expect(res).toBe(mintCount.toString());
  })

  test('requestedCount??? 0?????? ????????????, airdropMint??? ???????????? revert??? ??????.', async () => {  
    const requestedCount = 0;

    try {
      await GenericAPI.writeContract(authrizedAirdropSsscContract, 'airdropMint(address,uint256)', { target: await notOwner.getAddress(), requestedCount: requestedCount }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message).not.toBe('The trasaction have passed.');
    }
  })

  test('airdropMint??? ????????????, ???????????? ????????? ?????? ?????? ??????????????? ????????????.', async () => {  
    const requestedcount = 3;

    await GenericAPI.writeContract(authrizedAirdropSsscContract, 'airdropMint(address,uint256)', { target: await notOwner.getAddress(), requestedCount: requestedcount }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res: string[] = await Promise.all([
      GenericAPI.readContract(authrizedSsscContract, 'ownerOf(uint256)', { tokenId: mintCount }),
      GenericAPI.readContract(authrizedSsscContract, 'ownerOf(uint256)', { tokenId: mintCount + 1 }),
      GenericAPI.readContract(authrizedSsscContract, 'ownerOf(uint256)', { tokenId: mintCount + 2 }),
    ]);

    expect(res).toStrictEqual(
      await Promise.all([
        notOwner.getAddress(), 
        notOwner.getAddress(), 
        notOwner.getAddress(),
      ])
    );
  })
})