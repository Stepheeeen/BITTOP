"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export function WalletOverview() {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 lg:col-span-2">
      <div className="mb-6">
        <p className="text-muted-foreground text-sm mb-2">Total Wallet Balance</p>
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold text-foreground">{showBalance ? "$45,328.50" : "••••••••"}</h2>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
          >
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-green-600 dark:text-green-400 text-sm mt-2">+$2,145.32 (5.0%) today</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-2 block">Wallet Address</label>
          <div className="flex items-center gap-2 bg-card p-3 rounded-lg border border-border">
            <input
              type="text"
              value="1A1z7agoat2Rt7huohN4vSQvHZ7YHE9LfE"
              readOnly
              className="flex-1 bg-transparent text-sm text-foreground outline-none"
            />
            <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
              <Copy className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Deposit</Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Withdraw
          </Button>
        </div>
      </div>
    </Card>
  )
}
