// monorepo/apps/web/src/main.tsx

import "./polyfills/randomUUID";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { WalletSelectorContextProvider } from "./contexts/WalletSelectorContext";
import "./index.css";

/**
 * Called when the tab becomes active again (iOS Safari).
 * We force a reload so the wallet store sees the updated sign-in.
 */
function handleVisibilityChange() {
  if (!document.hidden) {
    // We just came back from background or from the wallet
    window.location.reload();
  }
}

function Root() {
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <WalletSelectorContextProvider>
      <App />
    </WalletSelectorContextProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
