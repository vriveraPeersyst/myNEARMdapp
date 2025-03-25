// Example domain models for trades

// Basic representation of an asset we can trade
export interface Asset {
    symbol: string;     // e.g., "NEAR", "USDC", "XRP"
    name: string;       // e.g., "NEAR Protocol", "USD Coin", "XRP"
    iconUrl?: string;   // optional icon URL
  }
  
  // Data structure for an individual trade
  export interface Trade {
    id: string;         // unique ID for the trade
    assetFrom: Asset;   // the asset we are selling
    assetTo: Asset;     // the asset we are buying
    amountFrom: number; // how many units of assetFrom
    amountTo: number;   // how many units of assetTo we receive
    entryPrice: number; // price of assetTo at time of purchase (in USD)
    exitPrice?: number; // price of assetTo at time of closing, if closed
    openedAt: number;   // timestamp
    closedAt?: number;  // timestamp
    pnl?: number;       // final computed PNL for that trade, in USD
  }
  
  // If you also want to keep track of a "position" or "active trade"
  export interface Position {
    trade: Trade;
    // If you want to track partial sells, you could track fraction left, etc.
  }
  