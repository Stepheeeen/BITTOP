"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, TrendingUp, TrendingDown } from "lucide-react"
import { useState } from "react"

export function CryptoMarket() {
  const [searchTerm, setSearchTerm] = useState("")

  const cryptoList = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 43258.5,
      change24h: 5.2,
      volume: "$28.5B",
      marketCap: "$840B",
      supply: "21M",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 2145.75,
      change24h: 3.8,
      volume: "$12.3B",
      marketCap: "$258B",
      supply: "120M",
    },
    {
      symbol: "BNB",
      name: "Binance Coin",
      price: 612.35,
      change24h: 2.5,
      volume: "$1.2B",
      marketCap: "$93B",
      supply: "152M",
    },
    { symbol: "SOL", name: "Solana", price: 98.5, change24h: -1.2, volume: "$2.5B", marketCap: "$41B", supply: "500M" },
    { symbol: "XRP", name: "Ripple", price: 0.52, change24h: 2.1, volume: "$850M", marketCap: "$27B", supply: "50B" },
    { symbol: "ADA", name: "Cardano", price: 0.92, change24h: 1.5, volume: "$500M", marketCap: "$32B", supply: "35B" },
    {
      symbol: "DOGE",
      name: "Dogecoin",
      price: 0.14,
      change24h: 4.2,
      volume: "$900M",
      marketCap: "$20B",
      supply: "142B",
    },
    {
      symbol: "LINK",
      name: "Chainlink",
      price: 18.45,
      change24h: -0.8,
      volume: "$650M",
      marketCap: "$8.5B",
      supply: "500M",
    },
  ]

  const filtered = cryptoList.filter(
    (c) =>
      c.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Market Table */}
      <Card className="bg-card border-border p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">Cryptocurrency</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">Price</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">24h Change</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">Volume</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">Market Cap</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((crypto) => (
                <tr key={crypto.symbol} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-foreground">{crypto.name}</p>
                      <p className="text-xs text-muted-foreground">{crypto.symbol}</p>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4 font-semibold text-foreground">
                    ${crypto.price.toLocaleString()}
                  </td>
                  <td className="text-right py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 ${crypto.change24h >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {crypto.change24h >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {Math.abs(crypto.change24h).toFixed(1)}%
                    </span>
                  </td>
                  <td className="text-right py-4 px-4 text-muted-foreground text-sm">{crypto.volume}</td>
                  <td className="text-right py-4 px-4 text-muted-foreground text-sm">{crypto.marketCap}</td>
                  <td className="text-right py-4 px-4">
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Invest
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
