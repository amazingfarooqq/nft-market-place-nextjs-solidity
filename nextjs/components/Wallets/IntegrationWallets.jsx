import { useWeb3React } from "@web3-react/core";
import { useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import './subComponents.css';
import styles from "../../styles/IntegrationWallets.module.css";
import {
  CoinbaseWallet,
  fortmatic,
  Injected,
  portis,
  WalletConnect,
} from "./Connectors";
import Image from "next/image";
import { useContextAPI } from "../../lib/context/ContextAPI";

export function IntegrationWallets() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { active, activate , library , account } = useWeb3React();

  const {signer, setSigner } = useContextAPI()
  console.log('signer' , signer);

  useMemo(() => {
    if (library !== undefined) {
      setSigner(library.getSigner(account))
    }
  }, [library, account])



  async function conToMetaMask() {
    if (typeof window.ethereum == "undefined") {
      alert("MetaMask is Not installed!");
    }else {
      try {
        await activate(Injected);
        setShow(false)
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function conToCoinbaseWallet() {

    try {
      await activate(CoinbaseWallet);
      setShow(false)
    } catch (error) {
      console.log(error);
    }
  }
  async function conToWalletConnect() {
    try {
      await activate(WalletConnect);
      setShow(false)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <button className="btn theme1-btn-color" onClick={handleShow}>
        Connect Wallet
      </button>

      <Modal show={show} onHide={handleClose} style={{ zIndex: "11111" }}>
        <Modal.Header closeButton>
          <Modal.Title>Connect to Any of these wallets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div
              className={`${styles.wallet_btn} row  py-3 mx-1 px-4 my-2`}
              onClick={conToMetaMask}
            >
              <div className="col text-start fs-5">MetaMask</div>
              <div className="col text-end">
                <img
                  className={`${styles.wallet_img}`}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                  alt="Metamask"
                />
                <img />
              </div>
            </div>
            <div
              className={`${styles.wallet_btn} row  py-3 mx-1 px-4 my-2`}
              onClick={conToCoinbaseWallet}
            >
              <div className="col text-start fs-5">CoinBase Wallet</div>
              <div className="col text-end">
                <img
                  className={`${styles.wallet_img}`}
                  src="https://www.pngrepo.com/download/331345/coinbase-v2.png"
                  alt="CoinBase"
                />
              </div>
            </div>
            <div
              className={`${styles.wallet_btn} row  py-3 mx-1 px-4 my-2`}
              onClick={conToWalletConnect}
            >
              <div className="col text-start fs-5">Connect Wallet</div>
              <div className="col text-end">
                <img
                  className={`${styles.wallet_img}`}
                  src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
                  alt="Connect"
                />
              </div>
            </div>
            <div
              className={`${styles.wallet_btn} row  py-3 mx-1 px-4 my-2`}
              onClick={() => activate(portis)}
            >
              <div className="col text-start fs-5">Portis Wallet</div>
              <div className="col text-end">
                <img
                  className={`${styles.wallet_img}`}
                  src="https://play-lh.googleusercontent.com/zNyG_6Xzgo0RoGESRbb73ao0ZKJeoNP05Qt8BHbXqEGyrb8-gsHPU3RAUQndT5y1PkBM"
                  alt="Portis"
                />
              </div>
            </div>
            <div
              className={`${styles.wallet_btn} row  py-3 mx-1 px-4 my-2`}
              onClick={() => activate(fortmatic)}
            >
              <div className="col text-start fs-5">Fortmatic Wallet</div>
              <div className="col text-end">
                <img
                  className={`${styles.wallet_img}`}
                  src="https://2510867812-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/spaces%2F-Lj7HukBJLlR6jbx0-eP%2Favatar.png?generation=1578363251850322&alt=media"
                  alt="Fortmatic"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
