import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { WalletSelectorContextProvider } from "./contexts/WalletSelectorContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletSelectorContextProvider>
      <App />
    </WalletSelectorContextProvider>
  </React.StrictMode>
);
