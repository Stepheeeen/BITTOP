"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"
import axiosClient from "@/lib/axiosClient"
import { getSession } from "@/lib/auth"

export function MarketHighlights() {
  const [cryptos, setCryptos] = useState<any[]>([])
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
        // For demo, set price and change as static or N/A
        const mapped = portfolio.map((p: any) => ({
          symbol: p.coin?.toUpperCase(),
          name: p.coin,
          price: `$${p.invested?.toLocaleString()}`,
          change: `${p.amount} ${p.coin}`,
          isPositive: true,
        }))
        setCryptos(mapped)
      })
      .catch((err) => {
        setError(err.response?.data?.error || err.message || "Failed to fetch portfolio")
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-bold text-foreground mb-4">Market Highlights</h2>
      <div className="space-y-3">
        {error && <p className="text-red-500 text-sm py-2">{error}</p>}
        {loading ? (
          <p className="text-gray-300 py-4 px-4">Loading portfolio...</p>
        ) : (
          <>
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
          </>
        )}
      </div>
    </Card>
  )
}
