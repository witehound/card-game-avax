import { ethers } from "ethers";
import { ABI, Addresss } from "../Contract";

export const updateCurrentWalletAddress = async () => {
  if (!window.ethereum) return;
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  } catch (e) {}
};

export const setSmartContractandProvider = async () => {
  if (!window.ethereum) return;
  try {
    const newProvier = new ethers.providers.Web3Provider(window.ethereum);
    const signer = newProvier.getSigner();
    const newContract = new ethers.Contract(Addresss, ABI, signer);

    return {
      newProvier,
      newContract,
    };
  } catch (e) {}
};
