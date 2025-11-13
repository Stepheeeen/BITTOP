"use client"

import { Card } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { useEffect, useState } from "react"
import axiosClient from "@/lib/axiosClient"
import { getSession } from "@/lib/auth"

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const session = getSession()
    const token = session?.token
    if (!token) return
    setLoading(true)
    setError("")
    axiosClient
      .get("/user/profile")
      .then((res) => {
        // Map API response to table format
        const apiTx = res.data.transactions || []
        const mapped = apiTx.map((tx: any, idx: number) => ({
          id: tx._id || idx,
          crypto: tx.coin,
          symbol: tx.coin?.toUpperCase(),
          amount: `${tx.amountCrypto} ${tx.coin}`,
          value: `$${tx.amountUSD?.toLocaleString()}`,
          type: tx.type,
          date: new Date(tx.date).toLocaleString(),
        }))
        setTransactions(mapped)
      })
      .catch((err) => {
        setError(err.response?.data?.error || err.message || "Failed to fetch transactions")
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-bold text-foreground mb-4">Recent Transactions</h2>
      <div className="overflow-x-auto">
        {error && <p className="text-red-500 text-sm py-2">{error}</p>}
        {loading ? (
          <p className="text-gray-300 py-4 px-4">Loading transactions...</p>
        ) : (
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
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${tx.type === "deposit" ? "bg-green-500/20 text-green-700 dark:text-green-400" : "bg-red-500/20 text-red-700 dark:text-red-400"}`}
                  >
                    {tx.type === "deposit" ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                    {tx.type.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-4 text-right text-sm text-muted-foreground">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    </Card>
  )
}
