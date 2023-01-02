import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles";
import {
  attack,
  attackSound,
  defense,
  defenseSound,
  player01 as player01icon,
  player02 as playey02icon,
} from "../assets";
import { playAudio } from "../utils/animation.js";
import { useGlobalContext } from "../Context";
import { Alert, PlayerInfo, Card, ActionButton, GameInfo } from "../components";
import { madeMove } from "../Constants";

const Battle = () => {
  const {
    contract,
    gameData,
    walletAddress,
    showAlert,
    setShowAlert,
    balGround,
    setBalGround,
    setErrorMessage,
    player1Ref,
    player2Ref,
  } = useGlobalContext();
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const { battleName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPlayerInfo = async () => {
      try {
        let player01Address = null;
        let player02Address = null;

        if (
          gameData.activeBattle.players[0].toLowerCase() ===
          walletAddress.toLowerCase()
        ) {
          player01Address = gameData.activeBattle.players[0];
          player02Address = gameData.activeBattle.players[1];
        } else {
          player01Address = gameData.activeBattle.players[1];
          player02Address = gameData.activeBattle.players[0];
        }

        const p1TokenData = await contract.getPlayerToken(player01Address);
        const player01 = await contract.getPlayer(player01Address);
        const player02 = await contract.getPlayer(player02Address);

        const p1ATT = p1TokenData.attackStrength.toNumber();
        const p1DEF = p1TokenData.defenseStrength.toNumber();
        const p1H = player01.playerHealth.toNumber();
        const p1M = player01.playerMana.toNumber();
        const p2H = player02.playerHealth.toNumber();
        const p2M = player02.playerMana.toNumber();

        setPlayer1({
          ...player01,
          att: p1ATT,
          mana: p1M,
          health: p1H,
          def: p1DEF,
        });

        setPlayer2({
          ...player02,
          att: "x",
          def: "x",
          mana: p2M,
          health: p2H,
        });
      } catch (error) {
        setErrorMessage(error);
      }
    };
    if (walletAddress && contract && gameData.activeBattle) getPlayerInfo();
  }, [contract, gameData, battleName]);

  const makeAMove = async (n) => {
    playAudio(n === 1 ? attackSound : defenseSound);

    try {
      await contract.attackOrDefendChoice(n, battleName);
      setShowAlert(() => madeMove(n));
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!gameData.activeBattle) navigate("/");
    }, [5000]);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.flexBetween} ${styles.gameContainer} ${balGround}`}
    >
      {showAlert.status ? (
        <Alert type={showAlert.type} message={showAlert.message} />
      ) : null}
      <PlayerInfo player={player2} playerIcon={playey02icon} mt />
      <div className={`${styles.flexCenter} flex-col my-10`}>
        <Card
          card={player2}
          title={player2?.playerName}
          cardRef={player2Ref}
          player2
        />

        <div className="flex items-center flex-row">
          <ActionButton
            handleClick={() => makeAMove(1)}
            resStyles="mr-2 hover:border-yellow-400"
            imgUrl={attack}
          />
          <Card
            card={player1}
            title={player1?.playerName}
            cardRef={player1Ref}
            resStyles="mt-3"
          />
          <ActionButton
            imgUrl={defense}
            handleClick={() => makeAMove(2)}
            resStyles="ml-6 hover:border-red-600"
          />
        </div>
      </div>
      <PlayerInfo player={player1} playerIcon={player01icon} />

      <GameInfo />
    </div>
  );
};

export default Battle;
