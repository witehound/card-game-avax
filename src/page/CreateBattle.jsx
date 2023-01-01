import { PageHOC } from "../components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles";
import { useGlobalContext } from "../Context";
import { CustomButton, CustomInput } from "../components";

const CreateBattle = () => {
  const navigate = useNavigate();
  const { contract, battleName, setBattleName } = useGlobalContext;
  const handleClick = async () => {};
  return (
    <>
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
        onClick={() => {
          navigate("/joinbattle");
        }}
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
