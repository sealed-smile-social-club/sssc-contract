// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "../token/ISSSC.sol";
import "../ownable/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract PublicSaleSSSC is Ownable {  
  // To prevent bot attack, we record the last contract call block number.
  mapping (address => uint256) private _lastCallBlockNumber; 

  uint256 private _antibotInterval;
  uint256 private _mintCount;                   // If someone burns NFT in the middle of minting, the tokenId will go wrong, so use the index instead of totalSupply().
  uint256 private _mintLimitPerBlock;           // Maximum purchase nft per person per block
  uint256 private _mintStartBlockNumber;        // In blockchain, blocknumber is the standard of time.
  uint256 private _maxSaleAmount;               // Maximum purchase volume of normal sale.
  uint256 private _mintPrice;                   // 1ETH = 1000000000000000000

  bool private _publicMintEnabled = false;

  ISSSC private _sssc;

  constructor (address mintSSSCAddress) {
    _sssc = ISSSC(mintSSSCAddress);
  }

  event PublicSaleSetup(
    address indexed owner,
    uint256 antibotInterval, 
    uint256 mintLimitPerBlock,
    uint256 mintStartBlockNumber,
    uint256 mintCount,
    uint256 maxSaleAmount,
    uint256 mintPrice
  );
  event PublicSaleStarted(address indexed owner, bool flag, bytes16 saleType);
  event PublicMinted(address indexed owner, uint256 tokenId);
  event Withdrawn(address indexed owner, uint256 balance);

  function setupSale(
    uint256 antibotInterval, 
    uint256 mintLimitPerBlock,
    uint256 mintStartBlockNumber,
    uint256 mintCount,
    uint256 maxSaleAmount,
    uint256 mintPrice
  ) external onlyOwner{
    _antibotInterval = antibotInterval;
    _mintLimitPerBlock = mintLimitPerBlock;
    _mintStartBlockNumber = mintStartBlockNumber;
    _mintCount = mintCount;
    _maxSaleAmount = maxSaleAmount;
    _mintPrice = mintPrice;

    emit PublicSaleSetup(
      msg.sender, 
      antibotInterval, 
      mintLimitPerBlock, 
      mintStartBlockNumber, 
      mintCount, 
      maxSaleAmount, 
      mintPrice
    );
  }

  function mintingInformation() external view returns (uint256[6] memory){
    uint256[6] memory info =
      [_antibotInterval, _mintCount, _mintLimitPerBlock,
        _mintStartBlockNumber, _maxSaleAmount, _mintPrice];
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
    // require(block.number >= _mintStartBlockNumber, "Not yet started");
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