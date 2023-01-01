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
import { initialAlert } from "../Constants";
import { createEventListeners } from "./createEventListeners";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState("");
  const [contract, setContract] = useState("");
  const [showAlert, setShowAlert] = useState(initialAlert);
  const [battleName, setBattleName] = useState("");
  const [gameData, setGameData] = useState({
    players: [],
    pendinBattles: [],
    activeBattle: null,
  });
  const navigate = useNavigate();

  const updateWallet = async () => {
    const account = await updateCurrentWalletAddress();
    setWalletAddress(account);
  };

  const getContract = async () => {
    const { newProvier, newContract } = await setSmartContractandProvider();
    setProvider(newProvier);
    setContract(newContract);
  };

  useEffect(() => {
    updateWallet();
    if (window.ethereum) window.ethereum.on("accountsChangedd", updateWallet);
  }, []);

  useEffect(() => {
    getContract();
  }, []);

  useEffect(() => {
    if (contract) {
      createEventListeners({
        navigate,
        contract,
        walletAddress,
        provider,
        setShowAlert,
      });
    }
  }, [contract]);

  useEffect(() => {
    if (showAlert.status) {
      const timer = setTimeout(() => {
        setShowAlert(initialAlert);
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    const fetchGameData = async () => {
      const fetchedBattles = await contract.getAllBattles();
      const pendingBattles = fetchedBattles.filter((battle) => {
        battle.battleStatus === 0;
      });
      let activeBattle = null;
      fetchedBattles.forEach((element) => {
        if (
          element.players.find(
            (player) => player.toLowerCase() === walletAddress.toLowerCase()
          )
        ) {
          if (element.winner.startsWith("0x00000")) {
            activeBattle = element;
          }
        }
      });

      setGameData({
        pendinBattles: pendingBattles.slice(1),
        activeBattle,
      });
    };

    if (contract && walletAddress) {
      fetchGameData();
    }
  }, [walletAddress]);

  return (
    <GlobalContext.Provider
      value={{
        walletAddress,
        contract,
        showAlert,
        setShowAlert,
        battleName,
        setBattleName,
        gameData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
