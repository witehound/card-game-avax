import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "./Context";

import { Home, CreateBattle } from "./page";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createbattle" element={<CreateBattle />} />
      </Routes>
    </GlobalContextProvider>
  </BrowserRouter>
);
