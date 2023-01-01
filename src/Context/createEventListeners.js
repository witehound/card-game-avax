import { Contract, ethers } from "ethers";
import { ABI } from "../Contract";

const addNewEvent = (evenFilter, provider, cb) => {
  provider.removeListener(evenFilter);
  provider.on(evenFilter, (logs) => {
    const parsedLogs = new ethers.utils.Interface(ABI).parseLog(logs);
    cb(parsedLogs);
  });
};

export const createEventListeners = ({
  navigate,
  contract,
  walletAddress,
  provider,
  setShowAlert,
}) => {
  const newPlayerEventFilter = contract.filters.NewPlayer();
  addNewEvent(newPlayerEventFilter, provider, ({ args }) => {
    console.log("args", args);
    if (walletAddress === args.owner) {
      setShowAlert({
        status: true,
        type: "success",
        message: "Player has been succesfully registered!",
      });
    }
  });
};
