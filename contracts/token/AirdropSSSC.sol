// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./ISSSC.sol";
import "../ownable/Ownable.sol";

contract AirdropSSSC is Ownable {  
  uint256 private _mintCount;

  ISSSC private _sssc;
  constructor (address mintSSSCAddress) {
    _sssc = ISSSC(mintSSSCAddress);
  }

  event MintCountSetup(address indexed owner, uint256 tokenId);
  event AirdropMinted(address indexed owner, uint256 tokenId);
  event Withdrawn(address indexed owner, uint256 balance);

  function setMintCount(uint256 mintCount) external onlyOwner {
    _mintCount = mintCount;
  }

  function getMintCount() external view returns (uint256) {
    return _mintCount;
  }

  function airdropMint(address target, uint256 requestedCount) external onlyOwner {
    require(_mintCount > 0, "Setup MintCount");
    require(requestedCount > 0, "zero request");
    
    for(uint256 i = 0; i < requestedCount; i++) {
      _sssc.mint(target, _mintCount);
      emit AirdropMinted(msg.sender, _mintCount);
      _mintCount += 1;
    }
  }

  function withdraw() external onlyOwner {
    payable(msg.sender).transfer(address(this).balance);

    emit Withdrawn(msg.sender, address(this).balance);
  }
}