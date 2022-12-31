import { PageHOC } from "../components";

const Home = () => {
  return <div></div>;
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
