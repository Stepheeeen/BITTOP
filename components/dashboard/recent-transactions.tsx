"use client"

import { Card } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

export function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      crypto: "Bitcoin",
      symbol: "BTC",
      amount: "0.25 BTC",
      value: "$10,814.50",
      type: "buy",
      date: "Today 2:30 PM",
    },
    {
      id: 2,
      crypto: "Ethereum",
      symbol: "ETH",
      amount: "5 ETH",
      value: "$10,725.00",
      type: "buy",
      date: "Today 1:15 PM",
    },
    {
      id: 3,
      crypto: "Solana",
      symbol: "SOL",
      amount: "50 SOL",
      value: "$4,925.00",
      type: "sell",
      date: "Yesterday 4:45 PM",
    },
    {
      id: 4,
      crypto: "Ripple",
      symbol: "XRP",
      amount: "1000 XRP",
      value: "$520.00",
      type: "buy",
      date: "Yesterday 10:20 AM",
    },
    {
      id: 5,
      crypto: "Bitcoin",
      symbol: "BTC",
      amount: "0.1 BTC",
      value: "$4,325.80",
      type: "sell",
      date: "2 days ago",
    },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-bold text-foreground mb-4">Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Asset</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Value</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Type</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="py-4 px-4">
                  <p className="font-medium text-foreground">{tx.crypto}</p>
                  <p className="text-xs text-muted-foreground">{tx.symbol}</p>
                </td>
                <td className="py-4 px-4 text-foreground">{tx.amount}</td>
                <td className="py-4 px-4 text-right font-medium text-foreground">{tx.value}</td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${tx.type === "buy" ? "bg-green-500/20 text-green-700 dark:text-green-400" : "bg-red-500/20 text-red-700 dark:text-red-400"}`}
                  >
                    {tx.type === "buy" ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                    {tx.type.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-4 text-right text-sm text-muted-foreground">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
