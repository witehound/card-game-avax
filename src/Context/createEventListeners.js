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
  setUpdateGameData,
}) => {
  const newPlayerEventFilter = contract.filters.NewPlayer();
  addNewEvent(newPlayerEventFilter, provider, ({ args }) => {
    if (walletAddress === args.owner) {
      setShowAlert({
        status: true,
        type: "success",
        message: "Player has been succesfully registered!",
      });
    }
  });

  const newBattleEventFilter = contract.filters.NewBattle();

  addNewEvent(newBattleEventFilter, provider, ({ args }) => {
    if (
      walletAddress.toLowerCase() === args.player1.toLowerCase() ||
      walletAddress.toLowerCase() === args.player2.toLowerCase()
    ) {
      navigate(`/battle/${args.battleName}`);
    }

    setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
  });
};
