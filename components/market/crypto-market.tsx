"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, TrendingUp, TrendingDown } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export function CryptoMarket() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [cryptoList, setCryptoList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchMarket = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 50,
            page: 1,
            sparkline: true,
          },
          headers: { Accept: "application/json" },
        })

        // Defensive mapping to avoid undefined errors
        const formatted = res.data.map((c: any) => ({
          id: c.id ?? "",
          name: c.name ?? "",
          symbol: c.symbol?.toUpperCase() ?? "",
          image: c.image ?? "",
          price: c.current_price ?? 0,
          change24h: c.price_change_percentage_24h ?? 0,
          volume: c.total_volume ?? 0,
          marketCap: c.market_cap ?? 0,
          sparkline: Array.isArray(c.sparkline_in_7d?.price) ? c.sparkline_in_7d.price : [],
        }))

        setCryptoList(formatted)
      } catch (err: any) {
        console.error("Error fetching market data:", err)
        setError(err.response?.data?.error || err.message || "Failed to fetch market data")
      } finally {
        setLoading(false)
      }
    }

    fetchMarket()
  }, [])

  const filtered = cryptoList.filter(
    (c) =>
      c.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInvest = (crypto: { symbol: string; name: string; price: number }) => {
    router.push(`/wallet?symbol=${crypto.symbol}&name=${crypto.name}&price=${crypto.price}`)
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <Card className="bg-card border-border p-6">
        <div className="overflow-x-auto">
          {error && <p className="text-red-500 text-sm py-2">{error}</p>}
          {loading ? (
            <p className="text-gray-300 py-4 px-4">Loading market data...</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground">
                    Cryptocurrency
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">Price</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">24h Change</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">Volume</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">Market Cap</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((crypto) => (
                  <tr key={crypto.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <img src={crypto.image} alt={crypto.name} className="w-6 h-6 rounded-full" />
                      <div>
                        <p className="font-semibold text-foreground">{crypto.name || "N/A"}</p>
                        <p className="text-xs text-muted-foreground">{crypto.symbol || "—"}</p>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 font-semibold text-foreground">
                      ${crypto.price?.toLocaleString() ?? "—"}
                    </td>
                    <td className="text-right py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 ${
                          crypto.change24h >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {crypto.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(crypto.change24h).toFixed(1)}%
                      </span>
                    </td>
                    <td className="text-right py-4 px-4 text-muted-foreground text-sm">
                      ${crypto.volume?.toLocaleString() ?? "—"}
                    </td>
                    <td className="text-right py-4 px-4 text-muted-foreground text-sm">
                      ${crypto.marketCap?.toLocaleString() ?? "—"}
                    </td>
                    <td className="text-right py-4 px-4">
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => handleInvest(crypto)}
                      >
                        Invest
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  )
}
