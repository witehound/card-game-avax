import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles";
import { Alert } from "../components";
import { battlegrounds } from "../assets";
import { useGlobalContext } from "../Context";
import { battleGroundAlert } from "../Constants";

const BattleGround = () => {
  const navigate = useNavigate();
  const { showAlert, setShowAlert, setBalGround, walletAdddress } =
    useGlobalContext();

  const handleBattleGroundChoice = (ground) => {
    setBalGround(ground.id);
    localStorage.setItem("battleGround", ground.id);
    setShowAlert(battleGroundAlert(ground.name));

    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return (
    <div className={`${styles.flexCenter} ${styles.battlegroundContainer}`}>
      {showAlert.status ? (
        <Alert type={showAlert.type} message={showAlert.message} />
      ) : null}
      <h1 className={`${styles.headText} text-center`}>
        Choose Your <span className="text-siteViolet">Battle</span> Ground
      </h1>
      <div className={`${styles.flexCenter} ${styles.battleGroundsWrapper}`}>
        {battlegrounds.map((ground) => (
          <div
            key={ground.id}
            className={`${styles.flexCenter} ${styles.battleGroundCard}`}
            onClick={() => handleBattleGroundChoice(ground)}
          >
            <img
              src={ground.image}
              alt="ground"
              className={`${styles.battleGroundCardImg}`}
            />
            <div className="info absolute">
              <p className={styles.battleGroundCardText}>{ground.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleGround;
