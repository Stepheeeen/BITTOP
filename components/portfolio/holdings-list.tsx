"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown } from "lucide-react"

export function HoldingsList() {
  const holdings = [
    { symbol: "BTC", name: "Bitcoin", amount: "0.85", price: "$36,769.53", change: "+8.5%", isPositive: true },
    { symbol: "ETH", name: "Ethereum", amount: "12.5", price: "$26,821.88", change: "+4.2%", isPositive: true },
    { symbol: "SOL", name: "Solana", amount: "250", price: "$24,625.00", change: "-1.8%", isPositive: false },
  ]

  return (
    <Card className="p-6 bg-card border-border lg:col-span-2">
      <h2 className="text-xl font-bold text-foreground mb-4">Your Holdings</h2>
      <div className="space-y-3">
        {holdings.map((holding, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1">
              <p className="font-semibold text-foreground">{holding.name}</p>
              <p className="text-sm text-muted-foreground">
                {holding.amount} {holding.symbol}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{holding.price}</p>
              <p
                className={`text-sm flex items-center justify-end gap-1 ${holding.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {holding.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {holding.change}
              </p>
            </div>
            <div className="ml-4 flex gap-2">
              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                Sell
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
                Buy More
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
