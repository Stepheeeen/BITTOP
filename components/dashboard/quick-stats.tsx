"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Zap } from "lucide-react"

export function QuickStats() {
  const stats = [
    {
      label: "Total Balance",
      value: "$45,328.50",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
    },
    {
      label: "24h Profit/Loss",
      value: "$2,145.32",
      change: "+8.2%",
      isPositive: true,
      icon: TrendingUp,
    },
    {
      label: "Portfolio Value",
      value: "$128,492.80",
      change: "-2.1%",
      isPositive: false,
      icon: Zap,
    },
    {
      label: "Pending Orders",
      value: "3",
      change: "2 Buy, 1 Sell",
      isPositive: true,
      icon: TrendingDown,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              <p
                className={`text-xs mt-2 ${stat.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {stat.change}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.isPositive ? "bg-primary/20" : "bg-red-500/20"}`}>
              <stat.icon className={`w-6 h-6 ${stat.isPositive ? "text-primary" : "text-red-500"}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
