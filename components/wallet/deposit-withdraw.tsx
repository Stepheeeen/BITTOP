"use client"

import { Card } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

export function DepositWithdraw() {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>

      <div className="space-y-3">
        {[
          { type: "deposit", amount: "$5,000", currency: "USD", date: "Today 10:30 AM", status: "completed" },
          { type: "withdraw", amount: "$2,500", currency: "USD", date: "Yesterday 3:45 PM", status: "completed" },
          { type: "deposit", amount: "$10,000", currency: "USD", date: "2 days ago", status: "pending" },
        ].map((activity, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${activity.type === "deposit" ? "bg-green-500/20" : "bg-blue-500/20"}`}>
                {activity.type === "deposit" ? (
                  <ArrowDownLeft
                    className={`w-4 h-4 ${activity.type === "deposit" ? "text-green-600 dark:text-green-400" : "text-blue-600"}`}
                  />
                ) : (
                  <ArrowUpRight
                    className={`w-4 h-4 ${activity.type === "deposit" ? "text-green-600 dark:text-green-400" : "text-blue-600"}`}
                  />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">{activity.type === "deposit" ? "Deposit" : "Withdraw"}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{activity.amount}</p>
              <p
                className={`text-xs ${activity.status === "completed" ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"}`}
              >
                {activity.status === "completed" ? "Completed" : "Pending"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
