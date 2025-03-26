// monorepo/apps/web/src/App.tsx
import React from "react";
import { useWalletSelector } from "./contexts/WalletSelectorContext";
import SplashScreen from "./components/SplashScreen";
import Routes from "./Routes";
import ConnectedAccountCard from "./components/ConnectedAccountCard";

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
      {/* For example, show the account card on the right */}
      <ConnectedAccountCard />
    </div>
  );
}
