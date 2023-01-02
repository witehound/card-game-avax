import { Contract, ethers } from "ethers";
import { defenseSound } from "../assets";
import { ABI } from "../Contract";
import { playAudio, sparcle } from "../utils/animation";
const emptyAdd = "0x0000000000000000000000000000000000000000";

const addNewEvent = (evenFilter, provider, cb) => {
  provider.removeListener(evenFilter);
  provider.on(evenFilter, (logs) => {
    const parsedLogs = new ethers.utils.Interface(ABI).parseLog(logs);
    cb(parsedLogs);
  });
};

const getCord = (ref) => {
  const { left, top, width, height } = ref.current.getBoundingClientRect();

  return {
    pageX: (left + width) / 2,
    pageY: (top + height) / 2.25,
  };
};

export const createEventListeners = ({
  navigate,
  contract,
  walletAddress,
  provider,
  setShowAlert,
  setUpdateGameData,
  player1Ref,
  player2Ref,
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

  const newBattleMoveEventFilter = contract.filters.BattleMove();
  addNewEvent(newBattleMoveEventFilter, provider, ({ args }) => {
    console.log("Battle move initiated", args);
  });

  const newRoundEndedEventFilter = contract.filters.RoundEnded();
  addNewEvent(newRoundEndedEventFilter, provider, ({ args }) => {
    console.log("Round Ended", args, walletAddress);

    for (let i = 0; i < args.damagedPlayers.length; i++) {
      if (args.damagedPlayers[i] !== emptyAdd) {
        if (args.damagedPlayers[i] === walletAddress) {
          sparcle(getCord(player1Ref));
          console.log("1");
        }
        if (args.damagedPlayers[i] !== walletAddress) {
          sparcle(getCord(player2Ref));
          console.log("2");
        }
      } else {
        playAudio(defenseSound);
      }
    }

    setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
  });
};
