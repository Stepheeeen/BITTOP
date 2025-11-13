"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axiosClient from "@/lib/axiosClient"
import { getSession } from "@/lib/auth"
export function PortfolioOverview() {
  const router = useRouter()
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const session = getSession()
    const token = session?.token
    if (!token) return
    setLoading(true)
    setError("")
    axiosClient
      .get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Use portfolio data from API response
        const portfolio = res.data.portfolio || []
        // For demo, show each coin as a chart point
        const mapped = portfolio.map((p: any) => ({
          name: p.coin?.toUpperCase(),
          value: p.invested ?? 0,
        }))
        setChartData(mapped)
      })
      .catch((err) => {
        setError(err.response?.data?.error || err.message || "Failed to fetch portfolio")
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <Card className="p-6 bg-card border-border lg:col-span-2">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Portfolio Growth</h2>
        <p className="text-sm text-muted-foreground">Current portfolio value by asset</p>
      </div>

      {error && <p className="text-red-500 text-sm py-2">{error}</p>}
      {loading ? (
        <p className="text-gray-300 py-4 px-4">Loading portfolio...</p>
      ) : (
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
      )}

      <div className="mt-6 flex gap-3">
        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => router.push('/wallet')}>Buy Crypto</Button>
        <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.push('/portfolio')}>
          View Details
        </Button>
      </div>
    </Card>
  )
}
