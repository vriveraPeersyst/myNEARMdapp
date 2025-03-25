import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupNearMobileWallet } from '@near-wallet-selector/near-mobile-wallet';

export const initWalletSelector = async () => {
  const selector = await setupWalletSelector({
    network: 'testnet', // or 'mainnet'
    modules: [setupNearMobileWallet()],
  });

  return selector;
};
