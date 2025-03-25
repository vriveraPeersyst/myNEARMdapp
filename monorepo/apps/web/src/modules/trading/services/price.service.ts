// Example price service for demonstration
// Replace with a real Coingecko or on-chain oracle for actual usage

// Mocked asset price map. In a real app, fetch from a live source
  
  export async function getPrice(assetSymbol: string): Promise<number> {
    const symbolMap: Record<string, string> = {
      NEAR: 'near',
      USDC: 'usd-coin',
      XRP: 'ripple',
    }
  
    const coingeckoSymbol = symbolMap[assetSymbol] || 'near'
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoSymbol}&vs_currencies=usd`
  
    const resp = await fetch(url).then((res) => res.json())
    return resp[coingeckoSymbol]?.usd ?? 0
  }
  
  