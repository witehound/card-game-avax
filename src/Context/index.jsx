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
import { GetParams } from "../utils/onboard";
import { Message } from "@material-ui/icons";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState("");
  const [contract, setContract] = useState("");
  const [showAlert, setShowAlert] = useState(initialAlert);
  const [battleName, setBattleName] = useState("");
  const [gameData, setGameData] = useState({
    players: [],
    pendingBattles: [],
    activeBattle: null,
  });
  const [updateGameData, setUpdateGameData] = useState(0);
  const [balGround, setBalGround] = useState(`bg-astral`);
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const player1Ref = useRef();
  const player2Ref = useRef();

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
    if (localStorage.getItem("battleGround"))
      setBalGround(localStorage.getItem("battleGround"));
  }, []);

  useEffect(() => {
    if (walletAddress && step !== -1) {
      createEventListeners({
        navigate,
        contract,
        walletAddress,
        provider,
        setShowAlert,
        setUpdateGameData,
        player1Ref,
        player2Ref,
      });
    }
  }, [walletAddress, step]);

  useEffect(() => {
    if (showAlert.status) {
      const timer = setTimeout(() => {
        setShowAlert(initialAlert);
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  //handle erro messages
  useEffect(() => {
    if (errorMessage) {
      const paresedErrorMessage = errorMessage?.reason
        ?.slice("execution reverted : ")
        .slice(0, -1);

      if (paresedErrorMessage) {
        setShowAlert({
          status: true,
          type: "failure",
          message: paresedErrorMessage,
        });
      }
    }
  }, [errorMessage]);

  useEffect(() => {
    const fetchGameData = async () => {
      const fetchedBattles = await contract.getAllBattles();

      const pendingBattles = fetchedBattles.filter(
        (battle) => battle.battleStatus === 0
      );
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
        pendingBattles: pendingBattles.slice(1),
        activeBattle,
      });
    };

    if (contract && walletAddress) {
      fetchGameData();
    }
  }, [walletAddress, updateGameData]);

  useEffect(() => {
    const resetParams = async () => {
      const currentStep = GetParams();
      setStep((await currentStep).step);
    };
    if (walletAddress) {
      resetParams();
    }
    window?.ethereum?.on("chainChanged", () => {
      resetParams();
    });
    window?.ethereum?.on("accountsChanged", () => {
      resetParams();
    });
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
        balGround,
        setBalGround,
        updateWallet,
        errorMessage,
        setErrorMessage,
        player1Ref,
        player2Ref,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
