import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../Context";
import { useState } from "react";
import { Info } from "@material-ui/icons";

const Home = () => {
  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");

  const handleRegisterUser = async () => {
    if (contract == undefined) return;
    try {
      const playerExist = await contract.isPlayer(walletAddress);
      if (!playerExist) {
        await contract.registerPlayer(playerName, playerName);
        setShowAlert({
          status: true,
          type: "Info",
          message: `${playerName} is being summoned!`,
        });
      }
    } catch (error) {
      setShowAlert({
        status: true,
        type: "error",
        message: error.message,
      });
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col">
      <CustomInput
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
        type={"text"}
      />
      <CustomButton
        title="Register"
        handleClick={handleRegisterUser}
        restType="mt-6"
      />
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
