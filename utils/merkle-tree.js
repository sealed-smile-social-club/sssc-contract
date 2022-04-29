// 1. Import libraries. Use `npm` package manager to install
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// 2. Collect list of wallet addresses from competition, raffle, etc.
// Store list of addresses in some data sheeet (Google Sheets or Excel)
const whitelistAddresses = [
  "0X5B38DA6A701C568545DCFCB03FCB875F56BEDDC4",
  "0X5A641E5FB72A2FD9137312E7694D42996D689D99",
  "0XDCAB482177A592E424D1C8318A464FC922E8DE40",
  "0X6E21D37E07A6F7E53C7ACE372CEC63D4AE4B6BD0",
  "0X09BAAB19FC77C19898140DADD30C4685C597620B",
  "0XCC4C29997177253376528C05D3DF91CF2D69061A",
  "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", // remix address
];

// 3. Create a new array of `leafNodes` by hashing all indexes of the `whitelistAddresses`
// using `keccak256`. Then creates a Merkle Tree object using keccak256 as the algorithm.
//
// The leaves, merkleTree, and rootHas are all PRE-DETERMINED prior to whitelist claim
const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});

// 4. Get root hash of the `merkleeTree` in hexadecimal format (0x)
// Print out the Entire Merkle Tree.
const rootHash = merkleTree.getRoot();
console.log('Whitelist Merkle Tree\n', merkleTree.toString());
console.log("Root Hash: ", rootHash.toString("hex"));

// ***** ***** ***** ***** ***** ***** ***** ***** // 

// CLIENT-SIDE: Use `msg.sender` address to query and API that returns the merkle proof
// required to derive the root hash of the Merkle Tree

// ✅ Positive verification of address
const claimingAddress = leafNodes[6];
// ❌ Change this address to get a `false` verification
// const claimingAddress = keccak256("0X5B38DA6A701C568545DCFCB03FCB875F56BEDDD6");

// `getHexProof` returns the neighbour leaf and all parent nodes hashes that will
// be required to derive the Merkle Trees root hash.
const hexProof = merkleTree.getHexProof(claimingAddress);
console.log(hexProof);

// ✅ - ❌: Verify is claiming address is in the merkle tree or not.
// This would be implemented in your Solidity Smart Contract
console.log(merkleTree.verify(hexProof, claimingAddress, rootHash));

// Merkle Proof
// [
//   "0xdfbe3e504ac4e35541bebad4d0e7574668e16fefa26cd4172f93e18b59ce9486",
//   "0x702d0f86c1baf15ac2b8aae489113b59d27419b751fbf7da0ef0bae4688abc7a",
//   "0xb159efe4c3ee94e91cc5740b9dbb26fc5ef48a14b53ad84d591d0eb3d65891ab"
// ]