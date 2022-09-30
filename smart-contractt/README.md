npx hardhat --network localhost test


npx hardhat run --network test scripts/deploy.js


npx hardhat verify --contract "contracts/NFT.sol:NFT" --network test <contractAddress> "param1" "param2"
