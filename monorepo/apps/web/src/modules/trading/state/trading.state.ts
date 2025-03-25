import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Trade, Asset } from '../types/trade.types'
import { v4 as uuid } from 'uuid'

interface TradingState {
  trades: Trade[]        // all completed trades
  currentTrade?: Trade   // the user's active trade (if any)

  // Actions
  openTrade: (assetFrom: Asset, assetTo: Asset, amountFrom: number, amountTo: number, entryPrice: number) => void
  closeTrade: (exitPrice: number) => void
  resetTrades: () => void
}

export const useTradingStore = create<TradingState>()(
  devtools((set) => ({
    trades: [],
    currentTrade: undefined,

    openTrade: (assetFrom, assetTo, amountFrom, amountTo, entryPrice) => {
      const newTrade: Trade = {
        id: uuid(),
        assetFrom,
        assetTo,
        amountFrom,
        amountTo,
        entryPrice,
        openedAt: Date.now(),
      }
      set({ currentTrade: newTrade })
    },

    closeTrade: (exitPrice) => {
      set((state) => {
        if (!state.currentTrade) return {}

        const closedTrade: Trade = {
          ...state.currentTrade,
          exitPrice,
          closedAt: Date.now(),
          // Rough PNL calculation: (exitPrice - entryPrice) * amountTo
          pnl: (exitPrice - state.currentTrade.entryPrice) * state.currentTrade.amountTo,
        }

        return {
          trades: [...state.trades, closedTrade],
          currentTrade: undefined,
        }
      })
    },

    resetTrades: () => set({ trades: [], currentTrade: undefined }),
  }))
)
