"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export function MarketHighlights() {
  const cryptos = [
    { symbol: "BTC", name: "Bitcoin", price: "$43,258", change: "+5.2%", isPositive: true },
    { symbol: "ETH", name: "Ethereum", price: "$2,145", change: "+3.8%", isPositive: true },
    { symbol: "SOL", name: "Solana", price: "$98.50", change: "-1.2%", isPositive: false },
    { symbol: "XRP", name: "Ripple", price: "$0.52", change: "+2.1%", isPositive: true },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-bold text-foreground mb-4">Market Highlights</h2>
      <div className="space-y-3">
        {cryptos.map((crypto, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div>
              <p className="font-semibold text-foreground">{crypto.symbol}</p>
              <p className="text-xs text-muted-foreground">{crypto.name}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{crypto.price}</p>
              <p
                className={`text-xs flex items-center justify-end gap-1 ${crypto.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {crypto.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {crypto.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
