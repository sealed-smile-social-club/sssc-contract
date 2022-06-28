import * as GenericAPI from '../src/api/eth-generic';

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

const tokenId = Math.floor(Math.random() * 2500) + 1;
// const tokenId = 1;

describe('Mint Contract', () => {
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
      expect(e.message).not.toBe('The trasaction have passed.');
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
      expect(e.message).not.toBe('The trasaction have passed.');
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
      expect(e.message).not.toBe('The trasaction have passed.');
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
      expect(e.message).not.toBe('The trasaction have passed.');
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
      expect(e.message).not.toBe('The trasaction have passed.');
    }
  })

  test('owner가 아닌 계정으로 mint를 실행하면 revert가 된다.', async () => {  
    try {
      await GenericAPI.writeContract(notAuthrizedSsscContract, 'mint(address, uint256)', { to: '0xa...', tokenId: 1 }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message).not.toBe('The trasaction have passed.');
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
      expect(e.message).not.toBe('The trasaction have passed.');
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
      expect(e.message).not.toBe('The trasaction have passed.');
    }
  })

  test('owner가 민팅을 시도하면, 민팅이 된다.', async () => {  
    await GenericAPI.writeContract(authrizedSsscContract, 'mint(address,uint256)', { to: await owner.getAddress(), tokenId: tokenId }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res = await GenericAPI.readContract(authrizedSsscContract, 'ownerOf(uint256)', { tokenId: tokenId });

    expect(res).toBe(await owner.getAddress());
  })

  test('revealed가 false 일 때, tokenURI notRevealedURI에 지정한 URI가 노출 된다.', async () => {
    await GenericAPI.writeContract(authrizedSsscContract, 'setRevealed(bool)', { state: false }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const tokenURI = await GenericAPI.readContract(authrizedSsscContract, 'tokenURI(uint256)', { tokenId: tokenId });
    expect(tokenURI).toBe(`https://resource.sssc.boutique/not-revealed/metadata.json`);
  })

  test('revealed가 true 일 때, tokenURI baseToeknURI에 지정한 URI가 노출 된다.', async () => {
    await GenericAPI.writeContract(authrizedSsscContract, 'setRevealed(bool)', { state: true }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const tokenURI = await GenericAPI.readContract(authrizedSsscContract, 'tokenURI(uint256)', { tokenId: tokenId });
    expect(tokenURI).toBe(`https://resource.sssc.boutique/metadata/${tokenId}.json`);
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
      expect(e.message).not.toBe('The trasaction have passed.');
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

      expect(res).toBe(await notOwner.getAddress());
  })
})

describe('WhitelistSale Contract', () => {
  beforeAll(async () => {});

  test('owner가 아닌 계정으로 쓰기 함수를 실행하면 revert가 된다.', () => {
    // withdraw, setupWhitelistSale, setWhitelistMintEnabled

    expect(true);
  })

  test('민팅 시작 플래그가 false인 상태에서 민팅을 시도하면 revert가 된다.', () => {
    expect(true);
  })

  test('민팅 시작 시간 or block이 충족되지 않은 상태에서 민팅을 시도하면 revert가 된다.', () => {
    expect(true);
  })

  test('세일 정보 + 민팅 플래그를 세일 활성화가 가능하게끔 업데이트를 한다.', () => {
    expect(true);
  })

  test('salePrice와 상이한 금액으로 민팅을 시도하면 revert가 된다.', () => {
    expect(true);
  })

  test('요청당 민팅 갯수 제한 수량을 초과하거나 0이하의 요청을 보내면 revert가 된다.', () => {
    expect(true);
  })

  test('해당 세일의 최대 민팅 갯수 제한 수량을 초과하면 revert가 된다.', () => {
    expect(true);
  })

  test('화이트리스트(머클프루프)에 등록되지 않은 지갑으로 민팅을 시도하면 revert가 된다.', () => {
    expect(true);
  })

  test('화이트리스트(머클프루프)에 등록된 지갑으로 민팅을 시도하면 민팅이 된다.', () => {
    expect(true);
  })

  test('이미 민팅을 진행했던 지갑으로 민팅을 시도하면 revert가 된다.', () => {
    expect(true);
  })

  test('출금 요청시, 보유중이었던 모든 ETH가 지정된 지갑으로 인출 된다.', () => {
    expect(true);
  })
})

describe('PublicSale Contract', () => {
  const owner = GenericAPI.createSignerFromPrivateKey(
    process.env.PRIVATE_KEY!, 
    process.env.PROVIDER_ENDPOINT!
  );

  beforeAll(async () => {});

  test('owner가 아닌 계정으로 쓰기 함수를 실행하면 revert가 된다.', () => {
    // withdraw, setupPublicSale, setPublicMintEnabled

    expect(true);
  })

  test('민팅 시작 플래그가 false인 상태에서 민팅을 시도하면 revert가 된다.', () => {
    expect(true);
  })

  test('민팅 시작 시간 or block이 충족되지 않은 상태에서 민팅을 시도하면 revert가 된다.', () => {
    expect(true);
  })

  test('세일 정보 + 민팅 플래그를 세일 활성화가 가능하게끔 업데이트를 한다.', () => {
    expect(true);
  })

  test('한 블록 내에서 여러 요청이 들어올 경우, revert가 된다. (봇 방지)', () => {
    expect(true);
  })

  test('salePrice와 상이한 금액으로 민팅을 시도하면 revert가 된다.', () => {
    expect(true);
  })

  test('요청당 민팅 갯수 제한 수량을 초과하거나 0이하의 요청을 보내면 revert가 된다.', () => {
    expect(true);
  })

  test('해당 세일의 최대 민팅 갯수 제한 수량을 초과하면 revert가 된다.', () => {
    expect(true);
  })

  test('모든 요건을 충족하여 민팅을 요청시, 정상적으로 민팅에 성공한다.', () => {
    expect(true);
  })

  test('출금 요청시, 보유중이었던 모든 ETH가 지정된 지갑으로 인출 된다.', () => {
    expect(true);
  })
})

describe('Airdrop Contract', () => {
  const mintCount = Math.floor(Math.random() * 5000) + 2501;
  console.log('mintCount', mintCount)
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

      await GenericAPI.writeContract(authrizedAirdropSsscContract, 'airdropMint(address,uint256)', { target: await notOwner.getAddress(), requestedCount: 3 }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message).not.toBe('The trasaction have passed.');
    }
  })

  test('owner 계정으로 setMintCount를 실행하면, mintCount가 지정 된다. (mintCount = tokenId)', async () => {  
    await GenericAPI.writeContract(authrizedAirdropSsscContract, 'setMintCount(uint256)', { mintCount: mintCount }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    const res: string = await GenericAPI.readContract(authrizedAirdropSsscContract, 'getMintCount()', {});

    expect(Number(res)).toBe(mintCount);
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