import React, { useState } from 'react'
import { useTrade } from '../hooks/useTrade'
import { Asset } from '../types/trade.types'

const NEAR: Asset = { symbol: 'NEAR', name: 'NEAR Protocol' }
const USDC: Asset = { symbol: 'USDC', name: 'USD Coin' }
const XRP: Asset = { symbol: 'XRP', name: 'XRP' }

const supportedAssets = [NEAR, USDC, XRP]

export default function TradePanel() {
  const { currentTrade, currentPrice, pnl, trades, openTrade, closeTrade } = useTrade()

  // For demonstration, user picks from these assets
  const [assetFrom, setAssetFrom] = useState<Asset>(USDC)
  const [assetTo, setAssetTo] = useState<Asset>(NEAR)
  const [amountFrom, setAmountFrom] = useState<number>(10)

  const handleSwap = async () => {
    // 1) get price of the assetTo
    const entryPrice = currentPrice || 2.0 // fallback, or fetch directly from price service
    // 2) compute a naive "amountTo" – e.g. (amountFrom * priceFrom) / priceTo
    // For simplicity, let's assume assetFrom is USDC for now. Adjust logic for real conversion.
    const amountTo = amountFrom / entryPrice

    // 3) open the trade
    openTrade(assetFrom, assetTo, amountFrom, amountTo, entryPrice)
  }

  const handleCloseTrade = () => {
    // 1) close using the current price
    if (currentPrice) {
      closeTrade(currentPrice)
    }
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, marginTop: 24 }}>
      <h2>Trade Panel</h2>

      {/* Select assets */}
      <div style={{ marginBottom: 8 }}>
        <label>Asset From: </label>
        <select
          value={assetFrom.symbol}
          onChange={(e) => {
            const asset = supportedAssets.find((a) => a.symbol === e.target.value)
            if (asset) setAssetFrom(asset)
          }}
        >
          {supportedAssets.map((asset) => (
            <option key={asset.symbol} value={asset.symbol}>
              {asset.symbol}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Asset To: </label>
        <select
          value={assetTo.symbol}
          onChange={(e) => {
            const asset = supportedAssets.find((a) => a.symbol === e.target.value)
            if (asset) setAssetTo(asset)
          }}
        >
          {supportedAssets.map((asset) => (
            <option key={asset.symbol} value={asset.symbol}>
              {asset.symbol}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div style={{ marginBottom: 8 }}>
        <label>Amount of {assetFrom.symbol}: </label>
        <input
          type="number"
          value={amountFrom}
          onChange={(e) => setAmountFrom(Number(e.target.value))}
        />
      </div>

      {/* Open or close trade */}
      {!currentTrade ? (
        <button onClick={handleSwap}>Open Trade</button>
      ) : (
        <button onClick={handleCloseTrade}>Close Trade</button>
      )}

      {/* Current Trade Info */}
      {currentTrade && (
        <div style={{ marginTop: 16 }}>
          <strong>Current Trade:</strong>
          <p>
            Swapped {currentTrade.amountFrom} {currentTrade.assetFrom.symbol} for{' '}
            {currentTrade.amountTo.toFixed(4)} {currentTrade.assetTo.symbol} at entry price $
            {currentTrade.entryPrice.toFixed(2)}
          </p>
          <p>Current Price: ${currentPrice.toFixed(2)}</p>
          <p>Unrealized PNL: ${pnl.toFixed(2)}</p>
        </div>
      )}

      {/* Past Trades */}
      {trades.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <strong>Trade History:</strong>
          <ul>
            {trades.map((t) => (
              <li key={t.id}>
                {t.assetFrom.symbol} → {t.assetTo.symbol} | Entry: {t.entryPrice.toFixed(2)} | Exit:{' '}
                {t.exitPrice?.toFixed(2)} | PNL: ${t.pnl?.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
