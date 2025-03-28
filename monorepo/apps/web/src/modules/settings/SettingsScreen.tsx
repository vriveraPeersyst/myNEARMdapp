// monorepo/apps/web/src/modules/settings/SettingsScreen.tsx

import React, { useState } from "react";
import ConnectedAccountCard from "../../components/ConnectedAccountCard";
import { useWalletSelector } from "../../contexts/WalletSelectorContext";

export default function SettingsScreen() {
  const { accountId } = useWalletSelector();
  const [showAccountModal, setShowAccountModal] = useState(false);

  const openAccountModal = () => {
    setShowAccountModal(true);
  };

  const closeAccountModal = () => {
    setShowAccountModal(false);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Settings</h2>
      <p>Manage user preferences, NEAR wallet connection, color scheme, etc.</p>

      {/* If the user is not signed in, disable or hide the button */}
      <button onClick={openAccountModal} disabled={!accountId}>
        Manage Account
      </button>

      {/* Our custom modal */}
      {showAccountModal && (
        <div style={styles.backdrop}>
          <div style={styles.modal}>
            <button style={styles.closeButton} onClick={closeAccountModal}>
              &times;
            </button>
            <ConnectedAccountCard />
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    padding: 16,
    minWidth: 280,
    maxWidth: "90%", // so it doesn't surpass the screen edges
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
};
