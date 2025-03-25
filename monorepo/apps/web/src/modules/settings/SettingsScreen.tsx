// monorepo/apps/web/src/modules/settings/SettingsScreen.tsx
import React from 'react'
// Import your wallet store or near.factory if you want to show connected wallet info

export default function SettingsScreen() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Settings</h2>
      <p>Manage user preferences, NEAR wallet connection, color scheme, etc.</p>
      {/* e.g. "Connect Wallet" button, toggle dark mode, etc. */}
    </div>
  )
}
