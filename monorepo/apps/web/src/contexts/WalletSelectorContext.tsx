/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// monorepo/apps/web/src/contexts/WalletSelectorContext.tsx
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AccountState, WalletSelector } from "@near-wallet-selector/core";
import { setupWalletSelector } from "@near-wallet-selector/core";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";
import { map, distinctUntilChanged } from "rxjs";

const CONTRACT_ID = "your-contract.testnet"; // replace with your actual contract
const NETWORK_ID = "testnet";

interface WalletSelectorContextValue {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: Array<AccountState>;
  accountId: string | null;
  selectedWalletId: string | null;
}

const WalletSelectorContext = createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<AccountState[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const init = useCallback(async () => {
    console.log("Initializing wallet selector...");

    const _selector = await setupWalletSelector({
      network: NETWORK_ID,
      debug: true,
      modules: [
        setupNearMobileWallet({
          dAppMetadata: {
            name: "NearTrader5",
            url: "https://example.com",
            logoUrl: "https://example.com/logo.png",
          },
        }),
      ],
    });

    const _modal = setupModal(_selector, {
      contractId: CONTRACT_ID,
    });

    // Initial accounts
    const state = _selector.store.getState();
    console.log("Initial store state:", state);
    setAccounts(state.accounts);

    // Attach to window for debugging
    (window as any).selector = _selector;
    (window as any).modal = _modal;

    setSelector(_selector);
    setModal(_modal);
    setLoading(false);
  }, []);

  useEffect(() => {
    init().catch((err) => {
      console.error("Failed to initialize wallet selector:", err);
      alert("Failed to initialize wallet selector");
    });
  }, [init]);

  useEffect(() => {
    if (!selector) return;

    // Subscribe to store changes
    const subscription = selector.store.observable
      .pipe(
        map((storeState) => storeState.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        console.log("Accounts Update:", nextAccounts);
        setAccounts(nextAccounts);
      });

    // Listen for modal hide events
    if (modal) {
      const onHideSubscription = modal.on("onHide", ({ hideReason }) => {
        console.log(`Modal hidden. Reason: ${hideReason}`);
      });
      return () => {
        subscription.unsubscribe();
        onHideSubscription.remove();
      };
    }

    return () => subscription.unsubscribe();
  }, [selector, modal]);

  const walletSelectorContextValue = useMemo<WalletSelectorContextValue>(() => {
    if (!selector || !modal) {
      return null as unknown as WalletSelectorContextValue;
    }
    const activeAccount = accounts.find((acc) => acc.active) || null;
    const { selectedWalletId } = selector.store.getState();
    return {
      selector,
      modal,
      accounts,
      accountId: activeAccount ? activeAccount.accountId : null,
      selectedWalletId: selectedWalletId ?? null,
    };
  }, [selector, modal, accounts]);

  if (loading || !walletSelectorContextValue) {
    return <div style={{ textAlign: "center", marginTop: 40 }}>Initializing wallet...</div>;
  }

  return (
    <WalletSelectorContext.Provider value={walletSelectorContextValue}>
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);
  if (!context) {
    throw new Error("useWalletSelector must be used within <WalletSelectorContextProvider>");
  }
  return context;
}
