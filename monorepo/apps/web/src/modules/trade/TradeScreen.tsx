// monorepo/apps/web/src/modules/trade/TradeScreen.tsx
import React from 'react'
import TradePanel from '../trading/components/TradePanel'

export default function TradeScreen() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Trade</h2>
      <TradePanel />
    </div>
  )
}
