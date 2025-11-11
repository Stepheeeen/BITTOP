"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const portfolioData = [
  { name: "Bitcoin", value: 45, color: "var(--color-chart-1)" },
  { name: "Ethereum", value: 30, color: "var(--color-chart-2)" },
  { name: "Solana", value: 15, color: "var(--color-chart-3)" },
  { name: "Others", value: 10, color: "var(--color-chart-4)" },
]

export function PortfolioBreakdown() {
  return (
    <Card className="p-6 bg-card border-border lg:col-span-1">
      <h2 className="text-xl font-bold text-foreground mb-4">Portfolio Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={portfolioData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {portfolioData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 space-y-2">
        {portfolioData.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
