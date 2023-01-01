import React, { useEffect } from "react";
import { PageHOC, CustomButton } from "../components";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";
import styles from "../styles";

const JoinBattle = () => {
  return <div>JoinBattle</div>;
};

export default PageHOC(JoinBattle);
