"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User } from "lucide-react"

export function ProfileSettings() {
  return (
    <Card className="p-6 bg-card border-border lg:col-span-2">
      <h2 className="text-xl font-bold text-foreground mb-6">Profile Information</h2>

      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
        <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
          <User className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">John Doe</h3>
          <p className="text-sm text-muted-foreground">john.doe@email.com</p>
        </div>
        <Button size="sm" variant="outline" className="ml-auto bg-transparent">
          Change Photo
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">Full Name</label>
          <Input defaultValue="John Doe" className="bg-muted border-border" />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">Email</label>
          <Input defaultValue="john.doe@email.com" type="email" className="bg-muted border-border" />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">Phone</label>
          <Input defaultValue="+1 (555) 123-4567" className="bg-muted border-border" />
        </div>
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-6">Save Changes</Button>
      </div>
    </Card>
  )
}
