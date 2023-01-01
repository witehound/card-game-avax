import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  create,
  createContext,
} from "react";

import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import Web3Moddal from "web3modal";
import {
  setSmartContractandProvider,
  updateCurrentWalletAddress,
} from "../utils/context";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState("");
  const [contract, setContract] = useState("");
  const [test, setTest] = useState(false);

  const updateWallet = async () => {
    const account = await updateCurrentWalletAddress();
    setWalletAddress(account);
  };

  useEffect(() => {
    updateWallet();
    if (window.ethereum) window.ethereum.on("accountsChangedd", updateWallet);
  }, []);

  useEffect(() => {
    const { newProvier, newContract } = setSmartContractandProvider();
    setProvider(newProvier);
    setContract(newContract);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        walletAddress,
        contract,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
