import { PageHOC } from "../components";
import { useGlobalContext } from "../Context";

const Home = () => {
  const { contract, walletAddress } = useGlobalContext();
  return <div className="flex flex-col"></div>;
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
