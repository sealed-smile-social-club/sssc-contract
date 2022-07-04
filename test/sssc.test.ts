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

  test('owner가 아닌 계정으로 addOwner를 실행하면 revert가 된다.', async () => {  
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

  test('owner가 아닌 계정으로 removeOwner를 실행하면 revert가 된다.', async () => {  
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

  test('owner가 아닌 계정으로 setBaseURI 실행하면 revert가 된다.', async () => {  
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

  test('owner가 아닌 계정으로 setNotRevealedURI를 실행하면 revert가 된다.', async () => {  
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

  test('owner가 아닌 계정으로 setRevealed를 실행하면 revert가 된다.', async () => {  
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

  test('owner가 아닌 계정으로 mint를 실행하면 revert가 된다.', async () => {  
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

  test('owner가 아닌 계정으로 pause를 실행하면 revert가 된다.', async () => {  
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

  test('owner가 아닌 계정으로 unpause를 실행하면 revert가 된다.', async () => {  
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

  test('owner가 민팅을 시도하면, 민팅이 된다.', async () => {  
    await GenericAPI.writeContract(authrizedSsscContract, 'mint(address,uint256)', { to: await owner.getAddress(), tokenId: tokenId }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res = await GenericAPI.readContract(authrizedSsscContract, 'ownerOf(uint256)', { tokenId: tokenId });
    const expectedRes = await owner.getAddress();

    expect(res).toBe(expectedRes);
  })

  test('revealed가 false 일 때, tokenURI notRevealedURI에 지정한 URI가 노출 된다.', async () => {
    await GenericAPI.writeContract(authrizedSsscContract, 'setRevealed(bool)', { state: false }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res = await GenericAPI.readContract(authrizedSsscContract, 'tokenURI(uint256)', { tokenId: tokenId });
    const expectedRes = `https://resource.sssc.boutique/not-revealed/metadata.json`;

    expect(res).toBe(expectedRes);
  })

  test('revealed가 true 일 때, tokenURI baseToeknURI에 지정한 URI가 노출 된다.', async () => {
    await GenericAPI.writeContract(authrizedSsscContract, 'setRevealed(bool)', { state: true }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res = await GenericAPI.readContract(authrizedSsscContract, 'tokenURI(uint256)', { tokenId: tokenId });
    const expectedRes = `https://resource.sssc.boutique/metadata/${tokenId}.json`;

    expect(res).toBe(expectedRes);
  })

  test('paused일 때, 토큰 전송이 불가능하다.', async () => {
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

  test('unpaused일 때, 토큰 전송이 가능하다.', async () => {
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

  test('setWhitelistSaleInfo를 실행하면, 세일 정보가 저장된다.', async () => {
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

  test('setWhitelistMintEnabled를 실행하면, 세일 시작 플래그를 지정할 수 있다.', async () => {
    await GenericAPI.writeContract(authrizedWhitelistSaleSsscContract, 'setWhitelistMintEnabled(bool)', { state: false }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res = await GenericAPI.readContract(authrizedWhitelistSaleSsscContract, 'getWhitelitMintEnabled()', {});
    const expectedRes = false;

    expect(res).toBe(expectedRes);
  })

  test('setMerkleRoot를 실행하면, 머클루트를 저장 할 수 있다.', async () => {
    await GenericAPI.writeContract(authrizedWhitelistSaleSsscContract, 'setMerkleRoot(bytes32)', { merkleRoot: `0x${getMerkleTreeRoot(merkleTree)}` }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res = await GenericAPI.readContract(authrizedWhitelistSaleSsscContract, 'getMerkleRoot()', {});
    const expectedRes = `0x${getMerkleTreeRoot(merkleTree)}`;

    expect(res).toBe(expectedRes);
  })

  test('세일 시작 플래그가, false 일때 민팅을 시도하면 revert가 된다.', async () => {
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

  test('세일 기간이 아닐때, 민팅을 시도하면 revert가 된다.', async () => {
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

  test('요청당 민팅 갯수 제한 수량을 초과하거나 0이하의 요청을 보내면 revert가 된다.', async () => {
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

  test('salePrice와 상이한 금액으로 민팅을 시도하면 revert가 된다.', async () => {
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

  test('해당 세일의 최대 민팅 갯수 제한 수량을 초과하면 revert가 된다.', async () => {
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

  test('화이트리스트(머클프루프)에 등록되지 않은 지갑으로 민팅을 시도하면 revert가 된다.', async () => {
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

  test('화이트리스트(머클프루프)에 등록된 지갑으로 민팅을 시도하면 민팅이 된다.', async () => {
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

  test('이미 민팅을 진행했던 지갑으로 민팅을 시도하면 revert가 된다.', async () => {
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

  test('출금 요청시, 보유중이었던 모든 ETH가 지정된 지갑으로 인출 된다.', async () => {
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
   * Antibot 기능을 제외한 모든 기능이 WhitelistSale의 기능에 교집합이므로, 프론트엔드 연동 후 테스트 v0.2에서 디테일을 작성하는 것으로 한다.
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

  test('owner가 아닌 계정으로 setMintCount를 실행하면 revert가 된다.', async () => {  
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

  test('mintCount가 0일때, airdropMint를 실행하면 revert가 된다.', async () => {  
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

  test('owner 계정으로 setMintCount를 실행하면, mintCount가 지정 된다. (mintCount = tokenId)', async () => {  
    await GenericAPI.writeContract(authrizedAirdropSsscContract, 'setMintCount(uint256)', { mintCount: mintCount }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res: string = await GenericAPI.readContract(authrizedAirdropSsscContract, 'getMintCount()', {});

    expect(res).toBe(mintCount.toString());
  })

  test('requestedCount를 0으로 지정하여, airdropMint를 실행하면 revert가 된다.', async () => {  
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

  test('airdropMint를 실행하면, 대상에게 요청한 수량 만큼 에어드랍이 진행된다.', async () => {  
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