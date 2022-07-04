// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "../token/ISSSC.sol";
import "../ownable/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract WhitelistSaleSSSC is Ownable {  
  mapping(address => bool) private _whitelistClaimed;

  uint256 private _mintCount;                   // If someone burns NFT in the middle of minting, the tokenId will go wrong, so use the index instead of totalSupply().
  uint256 private _mintLimitPerBlock;           // Maximum purchase nft per person per sale
  uint256 private _mintStartTime;
  uint256 private _mintEndTime;
  uint256 private _maxSaleAmount;               // Maximum purchase volume of normal sale.
  uint256 private _mintPrice;                   // 1ETH = 1000000000000000000

  bool private _whitelistMintEnabled = false;
  
  bytes32 private _merkleRoot;
  
  ISSSC private _sssc;

  constructor (address mintSSSCAddress) {
    _sssc = ISSSC(mintSSSCAddress);
  }
  event WhitelistSaleSetup(
    address indexed owner,
    uint256 mintCount,
    uint256 mintLimitPerBlock,
    uint256 mintStartTime,
    uint256 mintEndTime,
    uint256 maxSaleAmount,
    uint256 mintPrice
  );
  event WhitelistSaleStarted(address indexed owner, bool flag, bytes16 saleType);
  event WhitelistMinted(address indexed owner, uint256 tokenId);
  event Withdrawn(address indexed owner, uint256 balance);

  function setWhitelistSaleInfo(
    uint256 mintCount,
    uint256 mintLimitPerBlock,
    uint256 mintStartTime,
    uint256 mintEndTime,
    uint256 maxSaleAmount,
    uint256 mintPrice
  ) external onlyOwner {
    _mintCount = mintCount;
    _mintLimitPerBlock = mintLimitPerBlock;
    _mintStartTime = mintStartTime;
    _mintEndTime = mintEndTime;
    _maxSaleAmount = maxSaleAmount;
    _mintPrice = mintPrice;

    emit WhitelistSaleSetup(
      msg.sender, 
      mintCount, 
      mintLimitPerBlock, 
      mintStartTime, 
      mintEndTime, 
      maxSaleAmount, 
      mintPrice
    );
  }

  function getWhitelistSaleInfo() external view returns (uint256[6] memory){
    uint256[6] memory info =
      [_mintCount, _mintLimitPerBlock, _mintStartTime, _mintEndTime, _maxSaleAmount, _mintPrice];
    return info;
  }

  function setWhitelistMintEnabled(bool state) external onlyOwner {
    require(_mintCount > 0, "Setup MintCount");
    // require(_mintPrice == 100, "");

    _whitelistMintEnabled = state;

    emit WhitelistSaleStarted(msg.sender, state, "whitelist");
  }

  function getWhitelitMintEnabled() external view returns (bool) {
    return _whitelistMintEnabled;
  }

  function getWhitelistClaimed(address target) external view returns (bool) {
    return _whitelistClaimed[target];
  }

  function setMerkleRoot(bytes32 merkleRoot) external onlyOwner {
    _merkleRoot = merkleRoot;
  }

  function getMerkleRoot() external view returns (bytes32) {
    return _merkleRoot;
  }

  function whitelistMint(uint256 requestedCount, bytes32[] calldata merkleProof) external payable {
    require(_whitelistMintEnabled, "The whitelist sale is not enabled!");
    require(block.timestamp >= _mintStartTime && block.timestamp <= _mintEndTime, "This is not the sale period");
    require(!_whitelistClaimed[msg.sender], 'Address already claimed!');
    require(requestedCount > 0 && requestedCount <= _mintLimitPerBlock, "Too many requests or zero request");
    require(msg.value == _mintPrice * requestedCount, "Not correct ETH");
    require(_mintCount + requestedCount <= _maxSaleAmount + 1, "Exceed max amount");
    
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
    require(MerkleProof.verify(merkleProof, _merkleRoot, leaf), 'Invalid proof!');

    for(uint256 i = 0; i < requestedCount; i++) {
      _sssc.mint(msg.sender, _mintCount);
      emit WhitelistMinted(msg.sender, _mintCount);
      _mintCount += 1;
    }

    _whitelistClaimed[msg.sender] = true;
  }

  function withdraw() external onlyOwner {
    payable(msg.sender).transfer(address(this).balance);

    emit Withdrawn(msg.sender, address(this).balance);
  }
}