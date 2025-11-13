"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import axiosClient from "@/lib/axiosClient"
import { getSession } from "@/lib/auth"

export function QuickStats() {
  const [stats, setStats] = useState<any[]>([])
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
        const data = res.data
        // Calculate stats from API response
        const totalBalance = data.balance ?? 0
        const portfolioValue = data.portfolio?.reduce((sum: number, p: any) => sum + (p.invested ?? 0), 0) ?? 0
        // For demo, 24h profit/loss and pending orders are static or can be calculated if API provides
        setStats([
          {
            label: "Total Balance",
            value: `$${totalBalance.toLocaleString()}`,
            change: "",
            isPositive: true,
            icon: DollarSign,
          },
          {
            label: "Portfolio Value",
            value: `$${portfolioValue.toLocaleString()}`,
            change: "",
            isPositive: true,
            icon: Zap,
          },
          {
            label: "24h Profit/Loss",
            value: "$0.00",
            change: "N/A",
            isPositive: true,
            icon: TrendingUp,
          },
          {
            label: "Pending Orders",
            value: "0",
            change: "N/A",
            isPositive: true,
            icon: TrendingDown,
          },
        ])
      })
      .catch((err) => {
        setError(err.response?.data?.error || err.message || "Failed to fetch stats")
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {error && <p className="text-red-500 text-sm py-2">{error}</p>}
      {loading ? (
        <p className="text-gray-300 py-4 px-4">Loading stats...</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
