import { Wallet, getDefaultProvider, Signer, utils, providers, Contract, ContractInterface, BigNumber } from 'ethers';

export const createSignerFromMnemonics = (mnemonics: string, network: string) => 
  Wallet.fromMnemonic(mnemonics).connect(getDefaultProvider(network));

export const createSignerFromPrivateKey = (privateKey: string, network: string) =>
  new Wallet(privateKey).connect(getDefaultProvider(network));

export const getContractByInterface = (address: string, contractInterface: ContractInterface, signerOrProvider: Signer) => 
  new Contract(address, contractInterface, signerOrProvider);

export const getGasEstimate = (contract: Contract, fnName: string, params: any) => {
  const inputs = orderInputs(contract, fnName, params);
  return contract.estimate[fnName](...inputs);
}

export const writeContract = async (
  contract: Contract, 
  fnName: string, 
  params: any, 
  overrides: { 
    value?: number,
    gasPrice: number, 
    gasLimit: number,
    confirmations: number
  }) => {
  const inputs = orderInputs(contract, fnName, params);

  // console.log('writeContract#inputs:', inputs);

  const res = await contract[fnName](...inputs, {
    value: overrides.value,
    gasPrice: overrides.gasPrice ? utils.parseUnits(overrides.gasPrice.toString(), 'gwei') : undefined,
    gasLimit: overrides.gasLimit && !isNaN(overrides.gasLimit) ? Number(overrides.gasLimit) : undefined,
  });

  // console.log('writeContract#txResponse:', res);

  return res.wait(overrides.confirmations);
}

export const readContract = async (contract: Contract, fnName: string, params: any) => {
  const query = createQuery(contract, fnName, params);
  const res = await query.call();

  return parseQueryResult(res, query.outputTypes);
}

const createQuery = (contract: Contract, queryName: string, params: any) => {
  const inputs = orderInputs(contract, queryName, params);

  if (!contract[queryName]) {
    throw new Error(`"${contract}" doesn't have any function named as "${queryName}"!`);
  }

  return {
    call: contract[queryName].bind(contract, ...inputs),
    outputTypes: contract.interface.functions[queryName].outputs!.map(output => output.type)
  };
}

export const orderInputs = (contract: Contract, fnName: string, params: any) => {
  const inputs: any[] = [];
  contract.interface.functions[fnName].inputs.forEach(input => {
    if (params[input.name] || typeof Boolean) {
      inputs.push(params[input.name]);
    }
  });
  return inputs;
}

const parseQueryResult = (result: any, outputTypes: string[]) => {
  // if (outputTypes.length > 1) {
  //   return outputTypes.map((type, i) => {
  //     return result[i] instanceof BigNumber
  //       ? result[i].toString()
  //       : result[i];
  //   });
  // }

  if (result instanceof Array) {
    return result.map(a => {
      return a instanceof BigNumber
        ? a.toString()
        : a;
    })
  }

  return result instanceof BigNumber
    ? result.toString()
    : result;
}

function isBigNumber(type: string) {
  switch (type) {
    case 'int':
    case 'int8':
    case 'int16':
    case 'int32':
    case 'int64':
    case 'int128':
    case 'int256':
    case 'uint':
    case 'uint8':
    case 'uint16':
    case 'uint32':
    case 'uint64':
    case 'uint128':
    case 'uint256':
      return true;
    default:
      return false;
  }
}