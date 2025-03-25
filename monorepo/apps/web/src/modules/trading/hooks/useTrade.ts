import { useEffect, useState } from 'react'
import { useTradingStore } from '../state/trading.state'
import { getPrice } from '../services/price.service'
import { Trade } from '../types/trade.types'

/**
 * This hook returns:
 * - currentTrade (if any)
 * - PNL in real-time
 * - functions to open, close, or partially close trades
 * - real-time price of the current asset
 */
export function useTrade() {
  const { currentTrade, openTrade, closeTrade, trades } = useTradingStore()
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [pnl, setPnl] = useState<number>(0)

  // Whenever currentTrade changes, fetch the real-time price of the assetTo
  useEffect(() => {
    let intervalId: NodeJS.Timer

    async function fetchPriceLoop() {
      if (currentTrade?.assetTo.symbol) {
        const price = await getPrice(currentTrade.assetTo.symbol)
        setCurrentPrice(price)

        // naive PNL calculation
        if (currentTrade) {
          const _pnl = (price - currentTrade.entryPrice) * currentTrade.amountTo
          setPnl(_pnl)
        }
      }
    }

    if (currentTrade) {
      // fetch price immediately, then fetch repeatedly
      fetchPriceLoop()
      intervalId = setInterval(fetchPriceLoop, 5000) // poll every 5s
    } else {
      // reset when no current trade
      setCurrentPrice(0)
      setPnl(0)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [currentTrade])

  return {
    currentTrade,
    currentPrice,
    pnl,
    trades,
    openTrade,
    closeTrade,
  }
}
