//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Context.sol";

abstract contract Ownable is Context {
  mapping(address => bool) public owners;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
  event OwnershipRevoked(address indexed revokedOwner);
  event OwnershipExtended(address indexed host, address indexed guest);

  modifier onlyOwner() {
    require(isOwner(_msgSender()), "Ownable: caller is not the owner");
    _;
  }

  constructor() {
    owners[msg.sender] = true;
  }

  function isOwner(address owner) public view virtual returns (bool) {
    return owners[owner];
  }

  function addOwner(address guest) public onlyOwner {
    require(guest != address(0));
    owners[guest] = true;
    emit OwnershipExtended(_msgSender(), guest);
  }

  function removeOwner(address owner) public onlyOwner {
    require(owner != address(0));
    require(_msgSender() != owner);
    owners[owner] = false;
    emit OwnershipRevoked(owner);
  }

  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    owners[newOwner] = true;
    delete owners[_msgSender()];
    emit OwnershipTransferred(_msgSender(), newOwner);
  }
}