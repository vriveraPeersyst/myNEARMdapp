// monorepo/apps/web/src/core/wallet/wallet-actions.ts

import { initWalletSelector } from './wallet-selector';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let selector: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wallet: any;

export const initWallet = async () => {
  selector = await initWalletSelector();
  const { selectedWalletId } = selector.store.getState();
  if (selectedWalletId) {
    wallet = await selector.wallet()
  }
};

export const signInWithNearMobile = async () => {
  wallet = await selector.wallet('near-mobile');

  await wallet.signIn({
    contractId: 'your-contract.testnet', // replace with your actual contract
    methodNames: [],
  });
};

export const signOut = async () => {
  if (wallet) {
    await wallet.signOut()
  }
};

export const getAccounts = () => {
  return selector?.store.getState().accounts;
};
