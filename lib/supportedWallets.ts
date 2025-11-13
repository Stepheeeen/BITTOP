export interface WalletInfo {
  name: string
  symbol: string
  network: string
  address: string
  qrCode: string
}

export const supportedWallets: Record<string, WalletInfo> = {
  bitcoin: {
    name: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin Mainnet",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    qrCode: "/qr/bitcoin.png"
  },
  ethereum: {
    name: "Ethereum",
    symbol: "ETH",
    network: "ERC20",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    qrCode: "/qr/ethereum.png"
  },
  solana: {
    name: "Solana",
    symbol: "SOL",
    network: "Solana",
    address: "4Nd1m4iY2h1z2x9r3yzWYg5RzLLCeqzRZrwxEn2tS6z5",
    qrCode: "/qr/solana.png"
  },
  usdt: {
    name: "USDT (TRC20)",
    symbol: "USDT",
    network: "TRC20",
    address: "TXsQ7rjZ6b4fHb1JpZ8u7gKzQ3UQF1FwYy",
    qrCode: "/qr/usdt.png"
  },
  bnb: {
    name: "BNB",
    symbol: "BNB",
    network: "BEP20",
    address: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2",
    qrCode: "/qr/bnb.png"
  },
  tron: {
    name: "Tron",
    symbol: "TRX",
    network: "TRC20",
    address: "TXJ6y5N2rtm5zQ4t7EJvUJv3p7kDk1h2LZ",
    qrCode: "/qr/tron.png"
  },
  dodgecoin: {
    name: "Dogecoin",
    symbol: "DOGE",
    network: "Dogecoin",
    address: "D8Bv2k9J1w6A5x1e8tT3fN2xW3hQv8s4Yx",
    qrCode: "/qr/doge.png"
  },
  usdc: {
    name: "USDC",
    symbol: "USDC",
    network: "ERC20",
    address: "0x3F5CE5FBFe3E9af3971dD833D26BA9b5C936f0bE",
    qrCode: "/qr/usdc.png"
  }
}
