"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import { API_URL } from "@/lib/constant"
import { getSession } from "@/lib/auth"

// 💵 Fallback USD prices (used if backend returns 0)
const fallbackPricesUSD: Record<string, number> = {
  bitcoin: 68000,
  ethereum: 3600,
  tether: 1,
  bnb: 600,
  solana: 180,
  dogecoin: 0.1,
  cardano: 0.45,
  xrp: 0.6,
}

// 📊 Portfolio Breakdown Chart
function PortfolioBreakdown({ data }: { data: { name: string; value: number; color: string }[] }) {
  if (!data.length) return <p className="text-gray-300">No portfolio breakdown available.</p>

  return (
    <Card className="p-6 bg-card border-border lg:col-span-1">
      <h2 className="text-xl font-bold text-foreground mb-4">Portfolio Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => `${Number(value)?.toFixed(2)}%`} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{item.value.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

// 💰 Holdings List
function HoldingsList({ holdings }: { holdings: any[] }) {
  if (!holdings.length) return <p className="text-gray-300">No holdings yet.</p>

  return (
    <Card className="p-6 bg-card border-border lg:col-span-2">
      <h2 className="text-xl font-bold text-foreground mb-4">Your Holdings</h2>
      <div className="space-y-3">
        {holdings.map((holding, i) => {
          const isPositive = holding.gainLossUSD >= 0
          const change = Number(holding.gainLossUSD)
          return (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold text-foreground capitalize">{holding.coin}</p>
                <p className="text-sm text-muted-foreground">
                  {holding.amount} {holding.coin.toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">
                  ${Number(holding.currentValueUSD).toLocaleString()}
                </p>
                <p
                  className={`text-sm flex items-center justify-end gap-1 ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {change.toFixed(2)}$
                </p>
              </div>
              <div className="ml-4 flex gap-2">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                  onClick={() => (window.location.href = "/wallet")}
                >
                  Buy More
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

// 🧩 Portfolio View Wrapper
export function PortfolioView() {
  const [holdings, setHoldings] = useState<any[]>([])
  const [breakdown, setBreakdown] = useState<{ name: string; value: number; color: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const session = getSession()
  const token = session?.token

  useEffect(() => {
    if (!token) return

    const fetchPortfolio = async () => {
      setLoading(true)
      setError("")

      try {
        const res = await axios.get(`${API_URL}/portfolio`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const rawData = res.data || []

        // ⚡ Patch: USD fallback and safe calculations
        const data = rawData.map((asset: any) => {
          const amount = Number(asset.amount) || 0
          const invested = Number(asset.invested) || 0
          const currentValue = Number(asset.currentValue) || 0
          const fallbackPrice = fallbackPricesUSD[asset.coin?.toLowerCase?.()] || 1

          const currentValueUSD = currentValue > 0 ? currentValue : amount * fallbackPrice
          const gainLossUSD = currentValueUSD - invested

          return {
            ...asset,
            amount,
            invested,
            currentValueUSD,
            gainLossUSD,
          }
        })

        // Total for pie chart
        const totalCurrent = data.reduce((acc: number, h: any) => acc + h.currentValueUSD, 0) || 1

        const colors = ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#a78bfa"]

        const pieData = data.map((h: any, index: number) => ({
          name: h.coin,
          value: (h.currentValueUSD / totalCurrent) * 100,
          color: colors[index % colors.length],
        }))

        setHoldings(data)
        setBreakdown(pieData)
      } catch (err: any) {
        console.error(err)
        setError(err.response?.data?.error || "Failed to fetch portfolio data")
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [token])

  if (!token) return <p className="text-white text-center mt-6">Please log in to view your portfolio.</p>

  return (
    <div className="space-y-6">
      {loading && <p className="text-gray-300">Loading portfolio...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <PortfolioBreakdown data={breakdown} />
          <HoldingsList holdings={holdings} />
        </>
      )}
    </div>
  )
}
