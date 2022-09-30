require("hardhat-abi-exporter");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

 module.exports = {
  abiExporter: {
    path: "./abi_exporter",
    clear: true,
    flat: true,
    spacing: 2,
  },
  solidity:{
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.4.25",
      },
    ]
  }, 
  networks: {
    test: {
      url: process.env.URL,
      accounts: [process.env.PVT_KEY],
    },
  },
  localhost: {
    url: "http://127.0.0.1:7545",
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
};