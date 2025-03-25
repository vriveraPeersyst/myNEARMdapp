// monorepo/apps/web/src/components/WalletButtons.tsx

import React from 'react';
import { signInWithNearMobile, signOut, initWallet } from '../core/wallet/wallet-actions';

export const WalletButtons = () => {
  React.useEffect(() => {
    initWallet();
  }, []);

  return (
    <div>
      <button onClick={signInWithNearMobile}>Sign In with NEAR Mobile</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
