// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./MintSSSC.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract SaleSSSC is Ownable {  
  // To prevent bot attack, we record the last contract call block number.
  mapping (address => uint256) private _lastCallBlockNumber; 
  mapping(address => bool) private _whitelistClaimed;

  uint256 private _antibotInterval;
  uint256 private _mintIndexForSale;            // If someone burns NFT in the middle of minting, the tokenId will go wrong, so use the index instead of totalSupply().
  uint256 private _mintLimitPerBlock;           // Maximum purchase nft per person per block
  uint256 private _mintLimitPerSale;            // Maximum purchase nft per person per sale
  uint256 private _mintStartBlockNumber;        // In blockchain, blocknumber is the standard of time.
  uint256 private _maxSaleAmount;               // Maximum purchase volume of normal sale.
  uint256 private _mintPrice;                   // 1ETH = 1000000000000000000

  bool private _publicMintEnabled = false;
  bool private _whitelistMintEnabled = false;

  bytes32 private _merkleRoot;
  
  MintSSSC private _mintSSSC;

  constructor (address mintSSSCAddress) {
    //init explicitly.
    _mintIndexForSale = 1;
    _mintSSSC = MintSSSC(mintSSSCAddress);
  }

  function setupSale(
    uint256 newAntibotInterval, 
    uint256 newMintLimitPerBlock,
    uint256 newMintLimitPerSale,
    uint256 newMintStartBlockNumber,
    uint256 newMintIndexForSale,
    uint256 newMaxSaleAmount,
    uint256 newMintPrice
  ) external onlyOwner{
    _antibotInterval = newAntibotInterval;
    _mintLimitPerBlock = newMintLimitPerBlock;
    _mintLimitPerSale = newMintLimitPerSale;
    _mintStartBlockNumber = newMintStartBlockNumber;
    _mintIndexForSale = newMintIndexForSale;
    _maxSaleAmount = newMaxSaleAmount;
    _mintPrice = newMintPrice;
  }

  function mintingInformation() external view returns (uint256[7] memory){
    uint256[7] memory info =
      [_antibotInterval, _mintIndexForSale, _mintLimitPerBlock, _mintLimitPerSale, 
        _mintStartBlockNumber, _maxSaleAmount, _mintPrice];
    return info;
  }

  function setPublicMintEnabled(bool state) external onlyOwner {
    // 셋팅 스크립트에서 가드 해야하나... require(_mintPrice > 0, "");
    _publicMintEnabled = state;
  }

  function setWhitelistMintEnabled(bool state) external onlyOwner {
    // 셋팅 스크립트에서 가드 해야하나... require(_mintPrice > 0, "");
    _whitelistMintEnabled = state;
  }

  function publicMint(uint256 requestedCount) external payable {
    require(_publicMintEnabled, "The public sale is not enabled!");
    require(block.number >= _mintStartBlockNumber, "Not yet started");
    require(_lastCallBlockNumber[msg.sender] + _antibotInterval < block.number, "Bot is not allowed");
    require(requestedCount > 0 && requestedCount <= _mintLimitPerBlock, "Too many requests or zero request");
    require(msg.value == _mintPrice * requestedCount, "Not correct ETH");
    require(_mintIndexForSale + requestedCount <= _maxSaleAmount, "Exceed max amount");
    require(_mintSSSC.balanceOf(msg.sender) + requestedCount <= _mintLimitPerSale, "Exceed max amount per person");
    
    for(uint256 i = 0; i < requestedCount; i++) {
      _mintSSSC.mint(msg.sender, _mintIndexForSale);
      _mintIndexForSale += 1;
    }
    _lastCallBlockNumber[msg.sender] = block.number;
  }

  function whitelistMint(uint256 requestedCount, bytes32[] calldata merkleProof) external payable {
    require(_whitelistMintEnabled, "The whitelist sale is not enabled!");
    require(_mintSSSC.balanceOf(msg.sender) + requestedCount <= _mintLimitPerSale, "Exceed max amount per person");
    require(msg.value == _mintPrice * requestedCount, "Not correct ETH");
    require(!_whitelistClaimed[msg.sender], 'Address already claimed!');
    
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
    require(MerkleProof.verify(merkleProof, _merkleRoot, leaf), 'Invalid proof!');

    for(uint256 i = 0; i < requestedCount; i++) {
      _mintSSSC.mint(msg.sender, _mintIndexForSale);
      _mintIndexForSale += 1;
    }

    _whitelistClaimed[msg.sender] = true;
  }

  function airDropMint(address user, uint256 requestedCount) external onlyOwner {
    require(requestedCount > 0, "zero request");
    for(uint256 i = 0; i < requestedCount; i++) {
      _mintSSSC.mint(user, _mintIndexForSale);
      _mintIndexForSale += 1;
    }
  }

  function withdraw() external onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
  }
}