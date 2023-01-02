import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "./Context";
import { OnboardModal } from "./components";
import { Home, CreateBattle, JoinBattle, Battle, BattleGround } from "./page";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <OnboardModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createbattle" element={<CreateBattle />} />
        <Route path="/joinbattle" element={<JoinBattle />} />
        <Route path="/battle/:battleName" element={<Battle />} />
        <Route path="/battleground" element={<BattleGround />} />
      </Routes>
    </GlobalContextProvider>
  </BrowserRouter>
);
