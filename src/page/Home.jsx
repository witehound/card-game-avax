import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../Context";
import { useState } from "react";

const Home = () => {
  const { contract, walletAddress } = useGlobalContext();
  const [playeyName, setPlayeyName] = useState("");
  return (
    <div className="flex flex-col">
      <CustomInput
        label="Name"
        placeholder="Enter your player name"
        value={playeyName}
        handleValueChange={setPlayeyName}
        type={"text"}
      />
      <CustomButton title="Register" handleClick={() => {}} restType="mt-6" />
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playin <br /> The ultimate web3 NFT Card Game
  </>
);
