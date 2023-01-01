import React, { useEffect } from "react";
import { PageHOC, CustomButton } from "../components";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";
import styles from "../styles";
import { goToNewRoute } from "../utils/interact";

const JoinBattle = () => {
  const naviagte = useNavigate();
  const { contract, setShowAlert, setBattleName, gameData, walletAddress } =
    useGlobalContext();

  const handleJoinnBattle = async (name) => {
    if (contract) {
      setBattleName(name);
      try {
        await contract.joinBattle(name);
        setShowAlert({
          status: true,
          type: "success",
          message: `Joining ${name}`,
        });
      } catch (e) {}
    }
  };

  return (
    <>
      <h2 className={styles.joinHeadText}>Available Battles</h2>
      <div className={styles.joinContainer}>
        {gameData.pendingBattles.length ? (
          gameData.pendingBattles
            .filter((battle) => !battle.players.includes(walletAddress))
            .map((battle, index) => (
              <div key={battle.name + index} className={styles.flexBetween}>
                <p className={`${styles.joinBattleTitle}`}>
                  {index + 1}. {battle.name}
                </p>
                <CustomButton
                  title={"Join"}
                  handleClick={handleJoinnBattle}
                  restType="ml-"
                />
              </div>
            ))
        ) : (
          <p className={styles.joinLoading}>
            Reload The Page To see New Battles{" "}
          </p>
        )}
      </div>
      <p
        className={styles.infoText}
        onClick={() => {
          goToNewRoute(naviagte, "/createbattle");
        }}
      >
        Or Create New Battle
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <>
    {" "}
    Join <br /> A Battle
  </>,
  <> Join Already Existing Battles</>
);
