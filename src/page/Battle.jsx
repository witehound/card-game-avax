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
import { Alert } from "../components";

const Battle = () => {
  const {
    contract,
    gameData,
    walletAddress,
    showAlert,
    setShowAlert,
    balGround,
    setBalGround,
  } = useGlobalContext();
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const { battleName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    first;

    return () => {
      const getPlayerInfo = async () => {
        try {
        } catch (error) {}
      };
      if (walletAddress && contract && gameData.activeBattle) getPlayerInfo();
    };
  }, [contract, gameData, battleName]);

  return (
    <div
      className={`${styles.flexBetween} ${styles.gameContainer} ${balGround}`}
    >
      <h1 className="tx-xl">{battleName}</h1>
    </div>
  );
};

export default Battle;
