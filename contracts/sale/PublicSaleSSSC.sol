// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "../token/ISSSC.sol";
import "../ownable/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract PublicSaleSSSC is Ownable {  
  // To prevent bot attack, we record the last contract call block number.
  mapping (address => uint256) private _lastCallBlockNumber; 

  uint256 private _mintCount;                   // If someone burns NFT in the middle of minting, the tokenId will go wrong, so use the index instead of totalSupply().
  uint256 private _mintLimitPerBlock;           // Maximum purchase nft per person per block
  uint256 private _mintStartTime;
  uint256 private _mintEndTime;
  uint256 private _maxSaleAmount;               // Maximum purchase volume of normal sale.
  uint256 private _mintPrice;                   // 1ETH = 1000000000000000000
  uint256 private _antibotInterval;

  bool private _publicMintEnabled = false;

  ISSSC private _sssc;

  constructor (address mintSSSCAddress) {
    _sssc = ISSSC(mintSSSCAddress);
  }

  event PublicSaleSetup(
    address indexed owner,
    uint256 mintCount,
    uint256 mintLimitPerBlock,
    uint256 mintStartTime,
    uint256 mintEndTime,
    uint256 maxSaleAmount,
    uint256 mintPrice,
    uint256 antibotInterval
  );
  event PublicSaleStarted(address indexed owner, bool flag, bytes16 saleType);
  event PublicMinted(address indexed owner, uint256 tokenId);
  event Withdrawn(address indexed owner, uint256 balance);

  function setPublicSaleInfo(
    uint256 mintCount,
    uint256 mintLimitPerBlock,
    uint256 mintStartTime,
    uint256 mintEndTime,
    uint256 maxSaleAmount,
    uint256 mintPrice,
    uint256 antibotInterval
  ) external onlyOwner {
    _mintCount = mintCount;
    _mintLimitPerBlock = mintLimitPerBlock;
    _mintStartTime = mintStartTime;
    _mintEndTime = mintEndTime;
    _maxSaleAmount = maxSaleAmount;
    _mintPrice = mintPrice;
    _antibotInterval = antibotInterval;

    emit PublicSaleSetup(
      msg.sender, 
      mintCount,
      mintLimitPerBlock, 
      mintStartTime,
      mintEndTime,
      maxSaleAmount, 
      mintPrice,
      antibotInterval
    );
  }

  function getWhitelistSaleInfo() external view returns (uint256[7] memory){
    uint256[7] memory info =
      [_mintCount, _mintLimitPerBlock,
        _mintStartTime, _mintEndTime, _maxSaleAmount, _mintPrice, _antibotInterval];
    return info;
  }

  function setPublicMintEnabled(bool state) external onlyOwner {
    require(_mintCount > 0, "Setup MintCount");
    // require(_mintPrice == 100, "");

    _publicMintEnabled = state;

    emit PublicSaleStarted(msg.sender, state, "public");
  }

  function getPublicMintEnabled() external view returns (bool) {
    return _publicMintEnabled;
  }

  function publicMint(uint256 requestedCount) external payable {
    require(_publicMintEnabled, "The public sale is not enabled!");
    require(block.timestamp >= _mintStartTime && block.timestamp <= _mintEndTime, "This is not the sale period.");
    require(_lastCallBlockNumber[msg.sender] + _antibotInterval < block.number, "Bot is not allowed");
    require(requestedCount > 0 && requestedCount <= _mintLimitPerBlock, "Too many requests or zero request");
    require(msg.value == _mintPrice * requestedCount, "Not correct ETH");
    require(_mintCount + requestedCount <= _maxSaleAmount + 1, "Exceed max amount");
    
    for(uint256 i = 0; i < requestedCount; i++) {
      _sssc.mint(msg.sender, _mintCount);
      emit PublicMinted(msg.sender, _mintCount);
      _mintCount += 1;
    }
    
    _lastCallBlockNumber[msg.sender] = block.number;
  }

  function withdraw() external onlyOwner {
    payable(msg.sender).transfer(address(this).balance);

    emit Withdrawn(msg.sender, address(this).balance);
  }
}