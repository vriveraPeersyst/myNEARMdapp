// monorepo/apps/web/src/modules/history/HistoryScreen.tsx
import React from 'react'
import { useTradingStore } from '../trading/state/trading.state'

export default function HistoryScreen() {
  const trades = useTradingStore((state) => state.trades)

  return (
    <div style={{ padding: 16 }}>
      <h2>Trade History</h2>
      {trades.length === 0 ? (
        <p>No trades yet.</p>
      ) : (
        <ul>
          {trades.map((t) => (
            <li key={t.id}>
              {t.assetFrom.symbol} → {t.assetTo.symbol} | Entry: {t.entryPrice} | Exit: {t.exitPrice ?? '-'} | PNL: {t.pnl ?? '-'}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
