// monorepo/apps/web/src/modules/markets/MarketsScreen.tsx
import React from 'react'

export default function MarketsScreen() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Markets</h2>
      <p>List NEAR Intent assets (e.g. NEAR/USDC, NEAR/XRP, etc.) with current prices.</p>
      {/* 
        For a real app, fetch from your NEAR Intents or price feeds 
        and display in a table or list. Possibly show 24h % change. 
      */}
    </div>
  )
}
