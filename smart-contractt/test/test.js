const { expect } = require("chai"); 

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("NFTMarketplace", function () {

  let NFT;
  let nft;
  let NFTMarketplace;
  let nftMarketplace
  let deployer;
  let addr1;
  let addr2;
  let addrs;
  let feePercent = 1;
  let URI = "sample URI"

  beforeEach(async function () {
    // Get the ContractFactories and Signers here.
    NFT = await ethers.getContractFactory("NFT");
    NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    [deployer, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contracts
    nft = await NFT.deploy();
    nftMarketplace = await NFTMarketplace.deploy(feePercent , nft.address);
  });

  describe("Deployment", function () {

    it("Should track name and symbol of the nft collection", async function () {
      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      const nftName = "DApp NFT"
      const nftSymbol = "DAPP"
      expect(await nft.name()).to.equal(nftName);
      expect(await nft.symbol()).to.equal(nftSymbol);
    });

    it("Should track feeAccount and feePercent of the nftMarketplace", async function () {
      expect(await nftMarketplace.feeAccount()).to.equal(deployer.address);
      expect(await nftMarketplace.feePercent()).to.equal(feePercent);
    });
  });

  // describe("Minting NFTs", function () {

  //   it("Should track each minted NFT", async function () {
  //     // addr1 mints an nft
  //     await nft.connect(addr1).mint(URI)
  //     expect(await nft.tokenCount()).to.equal(1);
  //     expect(await nft.balanceOf(addr1.address)).to.equal(1);
  //     expect(await nft.tokenURI(1)).to.equal(URI);
  //     // addr2 mints an nft
  //     await nft.connect(addr2).mint(URI)
  //     expect(await nft.tokenCount()).to.equal(2);
  //     expect(await nft.balanceOf(addr2.address)).to.equal(1);
  //     expect(await nft.tokenURI(2)).to.equal(URI);
  //   });

  // })
  describe("Create Market Item", function () {

    it("Create NFT", async function () {
      // addr1 mints an nft
      await nft.connect(addr1).mint(URI)
      // await nft.connect(addr1).approve(nftMarketplace.address, 1)
      await nftMarketplace.connect(addr1).createMarketItem(nft.address , 1 , 1)
    });

  })


})