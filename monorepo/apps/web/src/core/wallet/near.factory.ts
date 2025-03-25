// monorepo/apps/web/src/core/wallet/near.factory.ts
import { WalletSelector, setupWalletSelector } from '@near-wallet-selector/core'
import { setupNearMobileWallet } from '@near-wallet-selector/near-mobile-wallet'
import { providers } from 'near-api-js'

let selector: WalletSelector | null = null
let provider: providers.Provider | null = null

export async function initNearSelector() {
  if (selector) return selector // already initialized

  selector = await setupWalletSelector({
    network: 'testnet', // or mainnet
    modules: [
      setupNearMobileWallet(),
      // ... other wallet modules
    ],
  })

  // create a JSON RPC provider
  provider = new providers.JsonRpcProvider({ url: 'https://rpc.testnet.near.org' })

  return selector
}

export function getSelector() {
  if (!selector) throw new Error('Wallet selector not initialized')
  return selector
}

export function getProvider() {
  if (!provider) throw new Error('Provider not initialized')
  return provider
}
