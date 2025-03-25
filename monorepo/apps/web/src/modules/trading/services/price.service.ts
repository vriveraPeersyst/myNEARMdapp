// Example price service for demonstration
// Replace with a real Coingecko or on-chain oracle for actual usage

// Mocked asset price map. In a real app, fetch from a live source
const MOCK_PRICES: Record<string, number> = {
    NEAR: 2.00,
    USDC: 1.00,
    XRP: 0.45,
  }
  
  export async function getPrice(assetSymbol: string): Promise<number> {
    // In a real scenario, you might call an API here:
    // const resp = await fetch(`https://api.coingecko.com/...?symbol=${assetSymbol}`)
    // return resp.data.price;
  
    // Simulate async with small delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRICES[assetSymbol] ?? 0)
      }, 300)
    })
  }
  