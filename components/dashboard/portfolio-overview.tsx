"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const chartData = [
  { name: "Jan", value: 35000 },
  { name: "Feb", value: 42000 },
  { name: "Mar", value: 38000 },
  { name: "Apr", value: 51000 },
  { name: "May", value: 48000 },
  { name: "Jun", value: 62000 },
]

export function PortfolioOverview() {
  return (
    <Card className="p-6 bg-card border-border lg:col-span-2">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Portfolio Growth</h2>
        <p className="text-sm text-muted-foreground">6 months performance</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: `1px solid var(--color-border)`,
              borderRadius: "8px",
            }}
            formatter={(value) => `$${value.toLocaleString()}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-primary)"
            strokeWidth={3}
            dot={{ fill: "var(--color-primary)", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 flex gap-3">
        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Buy Crypto</Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          View Details
        </Button>
      </div>
    </Card>
  )
}
