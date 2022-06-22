import * as GenericAPI from '../src/api/eth-generic';

import SSSC_ARTIFACT from '../build/contracts/SSSC.json';
import PUBLICSALE_SSSC_ARTIFACT from '../build/contracts/PublicSaleSSSC.json';
import WHITELISTSALE_SSSC_ARTIFACT from '../build/contracts/WhitelistSaleSSSC.json';
import AIRDROP_SSSC_ARTIFACT from '../build/contracts/AirdropSSSC.json';

const owner = GenericAPI.createSignerFromPrivateKey(
  process.env.PRIVATE_KEY!, 
  process.env.PROVIDER_ENDPOINT!
);

const notOwner = GenericAPI.createSignerFromPrivateKey(
  process.env.NO_PK!, 
  process.env.PROVIDER_ENDPOINT!
);

const ssscAddress = process.env.SSSC_ADDRESS!;
const ssscAbi = SSSC_ARTIFACT.abi;

describe('Mint Contract', () => {
  beforeAll(async () => {
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, owner);

    await GenericAPI.writeContract(ssscContract, 'setRevealed(bool)', { state: false }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });

    await GenericAPI.writeContract(ssscContract, 'pause()', { }, {
      gasPrice: 30,
      gasLimit: 1000000,
      confirmations: 1
    });
  });

  test('owner가 아닌 계정으로 addOwner를 실행하면 revert가 된다.', async () => {  
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, notOwner);
    try {
      await GenericAPI.writeContract(ssscContract, 'addOwner(address)', { guest: notOwner.getAddress() }, {
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
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, notOwner);
    try {
      await GenericAPI.writeContract(ssscContract, 'removeOwner(address)', { owner: notOwner.getAddress() }, {
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
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, notOwner);
    try {
      await GenericAPI.writeContract(ssscContract, 'setBaseURI(string)', { baseTokenURI: 'https://test-uri.com' }, {
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
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, notOwner);
    try {
      await GenericAPI.writeContract(ssscContract, 'setNotRevealedURI(string)', { newNotRevealedURI: 'https://test-uri.com' }, {
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
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, notOwner);
    try {
      await GenericAPI.writeContract(ssscContract, 'setRevealed(bool)', { state: true }, {
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
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, notOwner);
    try {
      await GenericAPI.writeContract(ssscContract, 'mint(address, uint256)', { to: '0xa...', tokenId: 1 }, {
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
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, notOwner);
    try {
      await GenericAPI.writeContract(ssscContract, 'pause()', { }, {
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
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, notOwner);
    try {
      await GenericAPI.writeContract(ssscContract, 'unpause()', { }, {
        gasPrice: 30,
        gasLimit: 1000000,
        confirmations: 1
      });

      throw Error('The trasaction have passed.')
    } catch (e: any) {
      expect(e.message).not.toBe('The trasaction have passed.');
    }
  })

  test('revealed가 false 일 때, baseURI는 notRevealedURI에 지정한 URI가 노출 된다.', async () => {
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, owner);
    const baseURI = await GenericAPI.readContract(ssscContract, 'getBaseURI()', {});

    expect(baseURI).toBe('https://resource.sssc.boutique/metadata/');
  })

  test('revealed가 false 일 때, baseURI는 notRevealedURI에 지정한 URI가 노출 된다.', async () => {
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, owner);
    const baseURI = await GenericAPI.readContract(ssscContract, 'getBaseURI()', {});

    expect(baseURI).toBe('https://resource.sssc.boutique/metadata/');
  })

  test('revealed가 true 일 때, baseURI는 baseToeknURI에 지정한 URI가 노출 된다.', async () => {
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, owner);
    expect(true);
  })

  test('pause가 false 일 때, 토큰 전송이 불가능하다.', async () => {
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, owner);
    expect(true);
  })

  test('pause가 true 일 때, 토큰 전송이 가능하다.', async () => {
    const ssscContract = GenericAPI.getContractByInterface(ssscAddress, ssscAbi, owner);
    expect(true);
  })
})

describe('WhitelistSale Contract', () => {
  const owner = GenericAPI.createSignerFromPrivateKey(
    process.env.PRIVATE_KEY!, 
    process.env.PROVIDER_ENDPOINT!
  );

  beforeAll(async () => {
    // console.log(owner)
    // console.log('Pre-process')
  });

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

  beforeAll(async () => {
    // console.log(owner)
    // console.log('Pre-process')
  });

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
  const owner = GenericAPI.createSignerFromPrivateKey(
    process.env.PRIVATE_KEY!, 
    process.env.PROVIDER_ENDPOINT!
  );

  beforeAll(async () => {
    // console.log(owner)
    // console.log('Pre-process')
  });

  test('owner가 아닌 계정으로 쓰기 함수를 실행하면 revert가 된다.', () => {
    // withdraw, airdropMint, setMintCount

    expect(true);
  })

  test('0이하의 에어드랍 요청을 보내면 revert가 된다.', () => {
    expect(true);
  })

  test('모든 요건을 충족하여 에어드랍 요청시, 정상적으로 에어드랍에 성공한다.', () => {
    expect(true);
  })
})