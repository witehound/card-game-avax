import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useGlobalContext } from "../Context";
import { player01, player02 } from "../assets";
import styles from "../styles";
import { useEffect } from "react";

const GameLoad = () => {
  const navigate = useNavigate();
  const { walletAddress } = useGlobalContext();

  return (
    <div className={`${styles.flexBetween} ${styles.gameLoadContainer}`}>
      <div className={styles.gameLoadBtnBox}>
        <CustomButton
          title={"Choose Battle Ground"}
          handleClick={() => navigate("/battleground")}
          restType="mt-6"
        />
      </div>
      <div className={`flex-1 ${styles.flexCenter} flex-col`}>
        <h1 className={`${styles.headText} text-center`}>
          Waiting For A Worthy Opponent...
        </h1>
        <p className={styles.gameLoadText}>
          ProTip : While You're Waiting Choose Your Preffered BattleGround
        </p>
        <div className={styles.gameLoadPlayersBox}>
          <div className={`${styles.flexCenter} flex-col`}>
            <img src={player01} alt="" className={styles.gameLoadPlayerImg} />
            <p className={styles.gameLoadPlayerText}>
              {walletAddress.slice(0, 30)}
            </p>
          </div>
          <h2 className={styles.gameLoadVS}>Vs</h2>
          <div className={`${styles.flexCenter} flex-col`}>
            <img src={player02} alt="" className={styles.gameLoadPlayerImg} />
            <p className={styles.gameLoadPlayerText}>******************</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLoad;
