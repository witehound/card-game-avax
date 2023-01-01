import React, { useEffect } from "react";
import { PageHOC, CustomButton } from "../components";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";
import styles from "../styles";
import { goToNewRoute } from "../utils/interact";

const JoinBattle = () => {
  const naviagte = useNavigate();

  return (
    <>
      <h2 className={styles.joinHeadText}>Available Battles</h2>
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
