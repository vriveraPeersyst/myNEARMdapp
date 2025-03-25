import React from "react";
import { useWalletSelector } from "./contexts/WalletSelectorContext";
import SplashScreen from "./components/SplashScreen";
import Routes from "./Routes"; // Your main tab-based routing

export default function App() {
  const { accountId } = useWalletSelector();

  if (!accountId) {
    return <SplashScreen />;
  }

  return <Routes />;
}
