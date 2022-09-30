const { expect } = require("chai");
const { ethers } = require("hardhat");
const { formatEther } = require("ethers/lib/utils");

function toWei(n) {
  return ethers.utils.parseUnits(n);
}

describe("Real Estate:", function () {
  let owner, a1, a2, a3,nftMarketplace;

  it("Deploy Smart Contract:", async function () {
    [owner, a1, a2, a3] = await ethers.getSigners();

    const NFTMarketplace = await ethers.getContractFactory("TetherToken");
    nftMarketplace = await NFTMarketplace.deploy();
    await nftMarketplace.deployed();

    
  });



});
