import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

// MetaMaskk
export const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56 , 97]
});

export const CoinbaseWallet = new WalletLinkConnector({
  url: `https://rinkeby.infura.io/v3/461d35d8280c4ee78f25da15fdcc48c1`,
  appName: "NFT Housing",
})

export const WalletConnect = new WalletConnectConnector({
  rpc: {
    1: "https://mainnet.infura.io/v3/7a93b9ef35c1445482ba26cc4b8c16f0",
    4: "https://rinkeby.infura.io/v3/7a93b9ef35c1445482ba26cc4b8c16f0",
  },
  infuraId: "7a93b9ef35c1445482ba26cc4b8c16f0",
  bridge: "https://bridge.walletconnect.org",
  chainId: 4,
  qrcode: true,
  pollingInterval: 12000,
})

// portis
export const portis = new PortisConnector({
  dAppId: "211b48db-e8cc-4b68-82ad-bf781727ea9e",
  networks: [1, 100]
});

// fortmatic
export const fortmatic = new FortmaticConnector({
  apiKey: "pk_live_F95FEECB1BE324B5",
  chainId: 1
});