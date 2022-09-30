import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { nft, nftjson } from "./../../smartContractData/nft";
import { nftMarketplace, nftMarketplacejson } from "./../../smartContractData/nftMarketplace";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

const ContextAPI = createContext({});

export const useContextAPI = () => useContext(ContextAPI);

export const ContextAPIProvider = ({ children }) => {
  const { library, active, account } = useWeb3React();

  const [signer, setSigner] = useState(null);

  const [nftContract, setNftContract] = useState();
  const [nftMarketplaceContract, setNftMarketplaceContract] = useState()

  console.log('nftContract' , nftContract);
  console.log('nftMarketplaceContract' , nftMarketplaceContract);

  useEffect(() => {
    if(active) {
        loadContracts();
    }
  }, [account, signer]);

  async function loadContracts() {
    const NFTContract = new ethers.Contract(nft, nftjson.abi, signer);
    const NFTMarketplaceContract = new ethers.Contract(nftMarketplace, nftMarketplacejson.abi, signer);
    setNftContract(NFTContract);
    setNftMarketplaceContract(NFTMarketplaceContract);
  }

  useMemo(() => {
    if (library !== undefined) {
      console.log("defined library");

      setSigner(library?.getSigner(account));
    } else {
      console.log("undefined library");
    }
  }, [account]);

  // console.log(usdtaddress,NFTilityToken,ticketToken.address,propertyToken.address,NFTilityExchange, realEstate.address);

  return (
    <ContextAPI.Provider
      value={{
        signer,
        setSigner,
        nftContract
      }}
    >
      {children}
    </ContextAPI.Provider>
  );
};
