import React from "react";
import Tilt from "react-parallax-tilt";

import styles from "../styles";
import { allCards } from "../assets";

const generateRandomCardTmg = () =>
  allCards[Math.floor(Math.random() * (allCards.length - 1))];

const ImgOne = generateRandomCardTmg();
const ImgTwo = generateRandomCardTmg();

const Card = ({ card, title, cardRef, player2, resStyles }) => {
  return (
    <Tilt>
      <div className={`${styles.cardContainer} ${resStyles}`}>
        <img
          src={player2 ? ImgTwo : ImgOne}
          alt="card"
          className={styles.cardImg}
        />
        <div
          className={`${styles.cardPointContainer} sm:left-[21.2%] left-[22%] ${styles.flexCenter}`}
        >
          <p className={`${styles.cardPoint} text-yellow-400`}>{card.att}</p>
        </div>
        <div
          className={`${styles.cardPointContainer} sm:right-[14.2%] right-[15%] ${styles.flexCenter}`}
        >
          <p className={`${styles.cardPoint} text-red-700`}>{card.att}</p>
        </div>
        <div className={`${styles.cardTextContainer} ${styles.flexCenter}`}>
          <p className={`${styles.cardText}`}>{title}</p>
        </div>
      </div>
    </Tilt>
  );
};

export default Card;
