// monorepo/apps/web/src/components/SignInOutButtons.tsx
import React from "react";
import { useWalletSelector } from "../contexts/WalletSelectorContext";

export default function SignInOutButtons() {
  const { selector, modal, accountId } = useWalletSelector();

  // 1) Show the modal for NEARMobile sign-in
  const handleSignIn = () => {
    modal.show();
  };

  // 2) Sign out from the active wallet
  const handleSignOut = async () => {
    try {
      const wallet = await selector.wallet(); 
      await wallet.signOut();
      // This clears local state, removing the key from localStorage
      // The store subscription sets accountId to null
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
