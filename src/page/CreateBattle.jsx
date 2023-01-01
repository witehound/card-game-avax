import { PageHOC } from "../components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles";
import { useGlobalContext } from "../Context";
import { CustomButton, CustomInput, GameLoad } from "../components";
import { goToNewRoute } from "../utils/interact";

const CreateBattle = () => {
  const navigate = useNavigate();
  const { contract, battleName, setBattleName } = useGlobalContext;
  const [waitBattle, setWaitBattle] = useState(true);
  const handleClick = async () => {};

  const createNewBattle = async () => {
    if (!battleName || !battleName.trim) return;
    try {
      await contract.createBattle(battleName);
      setWaitBattle(true);
    } catch (e) {
      console.log("createNewBattle", e);
    }
  };
  return (
    <>
      {waitBattle ? <GameLoad /> : null}
      <div className="flex flex-col mb-5s">
        <CustomInput
          label={"Battle"}
          placeholder="Enter Battle Name"
          value={battleName}
          handleValueChange={setBattleName}
        />
        <CustomButton
          title={"Create Battle!"}
          handleClick={handleClick}
          restType="mt-6"
        />
      </div>
      <p
        className={`${styles.infoText} mt-5`}
        onClick={goToNewRoute(navigate, "/joinbattle")}
      >
        Join Already Existing Battle
      </p>
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>
    Create <br /> a new battle
  </>,
  <>Create your own battle and wait for other players to join you</>
);
