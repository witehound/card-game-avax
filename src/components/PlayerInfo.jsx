import React from "react";
import ReactToolTip from "react-tooltip";
import styles from "../styles";

const healthPoints = 25;

const PlayerInfo = ({ player, playerIcon, mt }) => {
  const healthLevel = (points) =>
    points >= 12 ? "bg-green-500" : points >= 6 ? "bg-orange-500" : "bg-re-500";

  const marinIndexing = (index) => (index != healthPoints ? "mr-1" : "mr-0");
  return (
    <div className={`${styles.flexCenter} ${mt ? "mt-4" : "mb-4"}`}>
      <img
        data-for={`Player-${mt ? "1 " : "2"}`}
        data-tip
        src={playerIcon}
        alt="player2"
        className="w-14 h-14 object-contain rounded-full"
      />
      <div
        data-for={`Health-${mt ? "1 " : "2"}`}
        data-tip={`Health: ${player?.health}`}
        className={styles.playerHealth}
      >
        {[...Array(player.health).keys()].map((item, index) => (
          <div
            key={`player-item-${item}`}
            className={`${styles.playerHealthBar} ${healthLevel(
              player.health
            )} ${marinIndexing(index)}`}
          />
        ))}
      </div>
      <div
        data-for={`Mana-${mt ? "1" : "2"}`}
        data-tip="Mana"
        className={`${styles.flexCenter} ${styles.glassEffect} ${styles.playerMana}`}
      >
        {player.mana || 0}
      </div>
    </div>
  );
};

export default PlayerInfo;
