import React from "react";
import { useWalletSelector } from "../contexts/WalletSelectorContext";

export default function SplashScreen() {
  const { modal } = useWalletSelector();

  const handleSignIn = () => {
    modal.show(); // Opens the modal; with only NEARMobile available, it directs there.
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>NearTrader5</h1>
      <button style={styles.signInButton} onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: "2em",
    marginBottom: 32,
    color: "#333",
  },
  signInButton: {
    background: "linear-gradient(90deg, #41D1FF, #BD34FE)",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: 8,
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
};
