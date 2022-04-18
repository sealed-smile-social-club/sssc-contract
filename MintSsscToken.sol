// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintSsscToken is ERC721Enumerable {
    constructor() ERC721("sssc", "SSSC") {}

    function mintSsscToken() public {
        uint256 ssscTokenId = totalSupply() + 1;

        _mint(msg.sender, ssscTokenId);
    }

}