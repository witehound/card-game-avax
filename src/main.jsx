import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "./Context";

import { Home, CreateBattle, JoinBattle, Battle } from "./page";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createbattle" element={<CreateBattle />} />
        <Route path="/joinbattle" element={<JoinBattle />} />
        <Route path="/battle/:battleName" element={<Battle />} />
      </Routes>
    </GlobalContextProvider>
  </BrowserRouter>
);
