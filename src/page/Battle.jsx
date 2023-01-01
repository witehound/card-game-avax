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
import { GlobalContextProvider } from "../Context";
import { Alert } from "../components";

const Battle = () => {
  const { contract, gameData, walletAddress, showAlert, setShowAlert } =
    GlobalContextProvider();
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const { battleName } = useParams();
  const navigate = useNavigate();
  return <div>Battle</div>;
};

export default Battle;
