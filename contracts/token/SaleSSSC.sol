// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./MintSSSC.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract SaleSSSC is Ownable {  
  // To prevent bot attack, we record the last contract call block number.
  mapping (address => uint256) private _lastCallBlockNumber; 
  mapping(address => bool) private _whitelistClaimed;

  uint256 private _antibotInterval;
  uint256 private _mintCount;                   // If someone burns NFT in the middle of minting, the tokenId will go wrong, so use the index instead of totalSupply().
  uint256 private _mintLimitPerBlock;           // Maximum purchase nft per person per block
  uint256 private _mintLimitPerSale;            // Maximum purchase nft per person per sale
  uint256 private _mintStartBlockNumber;        // In blockchain, blocknumber is the standard of time.
  uint256 private _maxSaleAmount;               // Maximum purchase volume of normal sale.
  uint256 private _mintPrice;                   // 1ETH = 1000000000000000000
  bytes16 private _saleType;

  bool private _publicMintEnabled = false;
  bool private _whitelistMintEnabled = false;

  event SaleSetup(
    address indexed owner,
    uint256 antibotInterval, 
    uint256 mintLimitPerBlock,
    uint256 mintLimitPerSale,
    uint256 mintStartBlockNumber,
    uint256 mintIndexForSale,
    uint256 maxSaleAmount,
    uint256 mintPrice,
    bytes16 saleType
  );
  event SaleStarted(address indexed owner, bool flag, bytes16 saleType);
  event Minted(address indexed owner, uint256 tokenId);
  event Withdrawn(address indexed owner, uint256 balance);
  
  bytes32 private _merkleRoot;
  
  MintSSSC private _mintSSSC;

  constructor (address mintSSSCAddress) {
    //init explicitly.
    _mintCount = 1;
    _mintSSSC = MintSSSC(mintSSSCAddress);
  }

  function setupSale(
    uint256 antibotInterval, 
    uint256 mintLimitPerBlock,
    uint256 mintLimitPerSale,
    uint256 mintStartBlockNumber,
    uint256 mintIndexForSale,
    uint256 maxSaleAmount,
    uint256 mintPrice,
    bytes16 saleType
  ) external onlyOwner{
    _antibotInterval = antibotInterval;
    _mintLimitPerBlock = mintLimitPerBlock;
    _mintLimitPerSale = mintLimitPerSale;
    _mintStartBlockNumber = mintStartBlockNumber;
    _mintCount = mintIndexForSale;
    _maxSaleAmount = maxSaleAmount;
    _mintPrice = mintPrice;
    _saleType = saleType;

    emit SaleSetup(
      msg.sender, 
      antibotInterval, 
      mintLimitPerBlock, 
      mintLimitPerSale, 
      mintStartBlockNumber, 
      mintIndexForSale, 
      maxSaleAmount, 
      mintPrice, 
      saleType
    );
  }

  function mintingInformation() external view returns (uint256[7] memory){
    uint256[7] memory info =
      [_antibotInterval, _mintCount, _mintLimitPerBlock, _mintLimitPerSale, 
        _mintStartBlockNumber, _maxSaleAmount, _mintPrice];
    return info;
  }

  function setPublicMintEnabled(bool state) external onlyOwner {
    // require(_mintPrice == 100, "");
    _publicMintEnabled = state;

    emit SaleStarted(msg.sender, state, "public");
  }

  function getPublicMintEnabled() external view returns (bool) {
    return _publicMintEnabled;
  }

  function setWhitelistMintEnabled(bool state) external onlyOwner {
    // require(_mintPrice == 100, "");
    _whitelistMintEnabled = state;

    emit SaleStarted(msg.sender, state, "whitelist");
  }

  function getWhitelitMintEnabled() external view returns (bool) {
    return _whitelistMintEnabled;
  }

  function getWhitelistClaimed(address target) external view returns (bool) {
    return _whitelistClaimed[target];
  }

  function publicMint(uint256 requestedCount) external payable {
    require(_publicMintEnabled, "The public sale is not enabled!");
    require(block.number >= _mintStartBlockNumber, "Not yet started");
    require(_lastCallBlockNumber[msg.sender] + _antibotInterval < block.number, "Bot is not allowed");
    require(requestedCount > 0 && requestedCount <= _mintLimitPerBlock, "Too many requests or zero request");
    require(msg.value == _mintPrice * requestedCount, "Not correct ETH");
    require(_mintCount + requestedCount <= _maxSaleAmount + 1, "Exceed max amount");
    require(_mintSSSC.balanceOf(msg.sender) + requestedCount <= _mintLimitPerSale, "Exceed max amount per person");
    
    for(uint256 i = 0; i < requestedCount; i++) {
      _mintSSSC.mint(msg.sender, _mintCount);
      emit Minted(msg.sender, _mintCount);
      _mintCount += 1;
    }
    
    _lastCallBlockNumber[msg.sender] = block.number;
  }

  function whitelistMint(uint256 requestedCount, bytes32[] calldata merkleProof) external payable {
    require(_whitelistMintEnabled, "The whitelist sale is not enabled!");
    require(!_whitelistClaimed[msg.sender], 'Address already claimed!');
    require(msg.value == _mintPrice * requestedCount, "Not correct ETH");
    require(_mintCount + requestedCount <= _maxSaleAmount + 1, "Exceed max amount");
    require(_mintSSSC.balanceOf(msg.sender) + requestedCount <= _mintLimitPerSale, "Exceed max amount per person");
    
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
    require(MerkleProof.verify(merkleProof, _merkleRoot, leaf), 'Invalid proof!');

    for(uint256 i = 0; i < requestedCount; i++) {
      _mintSSSC.mint(msg.sender, _mintCount);
      emit Minted(msg.sender, _mintCount);
      _mintCount += 1;
    }

    _whitelistClaimed[msg.sender] = true;
  }

  function airDropMint(address user, uint256 requestedCount) external onlyOwner {
    require(requestedCount > 0, "zero request");
    for(uint256 i = 0; i < requestedCount; i++) {
      _mintSSSC.mint(user, _mintCount);
      emit Minted(msg.sender, _mintCount);
      _mintCount += 1;
    }
  }

  function withdraw() external onlyOwner {
    payable(msg.sender).transfer(address(this).balance);

    emit Withdrawn(msg.sender, address(this).balance);
  }
}