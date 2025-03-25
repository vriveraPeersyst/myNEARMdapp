import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { setupWalletSelector, type WalletSelector } from "@near-wallet-selector/core";
import { setupModal, type WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";

export interface AccountState {
  accountId: string;
  active: boolean;
}

interface WalletSelectorContextValue {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: AccountState[];
  accountId: string | null;
  selectedWalletId: string | null;
}

const NETWORK_ID = "testnet"; // change to 'mainnet' as needed
const CONTRACT_ID = "your-contract.testnet"; // update with your actual contract ID

const WalletSelectorContext = createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<AccountState[]>([]);
  const [loading, setLoading] = useState(true);

  const init = useCallback(async () => {
    // Initialize the wallet-selector with only NEARMobileWallet
    const _selector = await setupWalletSelector({
      network: NETWORK_ID,
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
      theme: "light",
    });

    modal?.show();

    const state = _selector.store.getState();
    setAccounts(state.accounts);
    setSelector(_selector);
    setModal(_modal);
    setLoading(false);
  }, []);

  useEffect(() => {
    init().catch((err) => {
      console.error("Wallet initialization error:", err);
      alert("Failed to initialize wallet selector");
    });
  }, [init]);

  useEffect(() => {
    if (!selector) return;
    const subscription = selector.store.observable.subscribe((nextState) => {
      setAccounts(nextState.accounts);
    });
    return () => subscription.unsubscribe();
  }, [selector]);

  const contextValue = useMemo(() => {
    if (!selector || !modal) return null;
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

  if (loading || !contextValue) {
    return <div style={{ textAlign: "center", marginTop: 40 }}>Initializing wallet...</div>;
  }

  return (
    <WalletSelectorContext.Provider value={contextValue}>
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);
  if (!context) {
    throw new Error("useWalletSelector must be used within WalletSelectorContextProvider");
  }
  return context;
}
