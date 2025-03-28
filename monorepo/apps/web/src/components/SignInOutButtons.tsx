// monorepo/apps/web/src/components/SignInOutButtons.tsx
import React from "react";
import { useWalletSelector } from "../contexts/WalletSelectorContext";

export default function SignInOutButtons() {
  const { selector, modal, accountId } = useWalletSelector();

  const handleSignIn = () => {
    // Show the wallet-selector modal for NEARMobile
    modal.show();
  };

  const handleSignOut = async () => {
    try {
      const wallet = await selector.wallet();
      await wallet.signOut();
      console.log("Signed out");
    } catch (err) {
      console.error("Failed to sign out", err);
    }
  };

  if (!accountId) {
    return <button onClick={handleSignIn}>Sign In</button>;
  }

  return (
    <div>
      <p>Logged in as {accountId}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
