const hre = require("hardhat")
const { ethers } = require("hardhat")
const fs = require('fs');

function toWei(n) {
  return ethers.utils.parseUnits(n)
}
async function main() {

  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace")
  const nftMarketplace = await NFTMarketplace.deploy()
  await nftMarketplace.deployed()

  console.log(nftMarketplace.address)

  fs.writeFileSync('./config.js', `
  export const marketplaceAddress = "${nftMarketplace.address}"
  `)

}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error)
    process.exit(1)
})
