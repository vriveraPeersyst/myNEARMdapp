// monorepo/apps/web/src/components/ConnectedAccountCard.tsx
import React from "react";
import { useWalletSelector } from "../contexts/WalletSelectorContext";

export default function ConnectedAccountCard() {
  const { selector, accountId } = useWalletSelector();

  if (!accountId) return <p>You are not signed in.</p>;

  const handleSignOut = async () => {
    try {
      const wallet = await selector.wallet();
      await wallet.signOut();
    } catch (err) {
      console.error("Failed to sign out", err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(accountId);
    alert("Copied account ID to clipboard!");
  };

  return (
    <div style={styles.card}>
      <div style={styles.topRow}>
        <img
          src="https://cryptologos.cc/logos/near-protocol-near-logo.png"
          alt="NEAR Protocol"
          style={styles.icon}
        />
        <div style={styles.accountInfo}>
          <span style={styles.accountId}>{accountId}</span>
          <span style={styles.subText}>NEAR Protocol</span>
        </div>
        <button style={styles.copyButton} onClick={handleCopy}>
          Copy
        </button>
      </div>

      <div style={styles.bottomRow}>
        <button style={styles.signOutButton} onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    maxWidth: "280px",
    width: "100%",
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  icon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  accountInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  accountId: {
    fontWeight: 600,
    fontSize: "0.95rem",
    color: "#333",
  },
  subText: {
    fontSize: "0.8rem",
    color: "#666",
  },
  copyButton: {
    border: "none",
    background: "#f0f0f0",
    borderRadius: "4px",
    padding: "6px 10px",
    cursor: "pointer",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "8px",
  },
  signOutButton: {
    background: "#ff585d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
  },
};
