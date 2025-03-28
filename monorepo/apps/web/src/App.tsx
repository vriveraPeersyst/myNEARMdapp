// monorepo/apps/web/src/App.tsx
import React from "react";
import { useWalletSelector } from "./contexts/WalletSelectorContext";
import SplashScreen from "./components/SplashScreen";
import Routes from "./Routes";

/**
 * If there's no accountId, show the splash screen.
 * Otherwise, show the main layout with routes.
 */
export default function App() {
  const { accountId } = useWalletSelector();

  if (!accountId) {
    return <SplashScreen />;
  }

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <div style={{ flex: 1 }}>
        <Routes />
      </div>
    </div>
  );
}
