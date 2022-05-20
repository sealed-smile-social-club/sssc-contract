// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "../ownable/Ownable.sol";

contract SSSC is ERC721Enumerable, Pausable, Ownable {
  string private _baseTokenURI;
  string private _notRevealedURI;
  bool private _revealed;

  constructor(
    string memory name,
    string memory symbol,
    string memory baseTokenURI,
    string memory notRevealedURI
  ) ERC721(name, symbol) {
    _baseTokenURI = baseTokenURI;
    _notRevealedURI = notRevealedURI;
    _revealed = false;
  }

  function setBaseURI(string memory baseTokenURI) external onlyOwner {
    _baseTokenURI = baseTokenURI;
  }

  function getBaseURI() external view returns (string memory) {
    return _baseTokenURI;
  }

  function _baseURI() internal view override returns (string memory) {
    return _baseTokenURI;
  }

  function setNotRevealedURI(string memory newNotRevealedURI) external onlyOwner {
    _notRevealedURI = newNotRevealedURI;
  }

  function getNotRevealedURI() external view returns (string memory) {
    return _notRevealedURI;
  }
  
  function setRevealed(bool state) external onlyOwner {
    _revealed = state;
  }

  function getReveled() external view returns (bool) {
    return _revealed;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721)
    returns (string memory)
  {
    require(
      _exists(tokenId), 
      "ERC721Metadata: URI query for nonexistent token"
    );

    return (_revealed == false)
      ? string.concat(_notRevealedURI, "metadata.json")
      : string.concat(_baseTokenURI, Strings.toString(tokenId), ".json");
  }

  function mint(address to, uint256 tokenId) external onlyOwner {
    _safeMint(to, tokenId);
  }

  function exists(uint256 tokenId) external view returns (bool) {
    return _exists(tokenId);
  }

  function pause() external onlyOwner {
    _pause();
  }

  function unpause() external onlyOwner {
    _unpause();
  }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    whenNotPaused
    override(ERC721Enumerable)
  {
    super._beforeTokenTransfer(from, to, tokenId);   
  }
}