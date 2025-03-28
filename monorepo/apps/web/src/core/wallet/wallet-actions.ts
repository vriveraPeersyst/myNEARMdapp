// monorepo/apps/web/src/core/wallet/wallet-actions.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { initWalletSelector } from "./wallet-selector";

let selector: any;
let wallet: any;

export const initWallet = async () => {
  selector = await initWalletSelector();
  const { selectedWalletId } = selector.store.getState();
  if (selectedWalletId) {
    wallet = await selector.wallet();
  }
};

export const signInWithNearMobile = async () => {
  if (!selector) {
    selector = await initWalletSelector();
  }
  wallet = await selector.wallet("near-mobile");

  await wallet.signIn({
    contractId: "your-contract.testnet", // your real contract
    methodNames: [],
    callbackUrl: window.location.href, // Return to this exact page
  });
};

export const signOut = async () => {
  if (wallet) {
    await wallet.signOut();
  }
};

export const getAccounts = () => {
  return selector?.store.getState().accounts;
};
