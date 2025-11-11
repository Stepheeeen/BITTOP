"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Lock } from "lucide-react"

export function SecuritySettings() {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">Security</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Enabled</p>
            </div>
          </div>
          <Button size="sm" variant="outline">
            Manage
          </Button>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-foreground">Password</p>
              <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
            </div>
          </div>
          <Button size="sm" variant="outline">
            Change
          </Button>
        </div>

        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full text-red-600 dark:text-red-400 border-red-500/50 hover:bg-red-500/10 bg-transparent"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </Card>
  )
}
