"use client"

import type React from "react"

import { useState } from "react"
import { TopBar } from "./top-bar"
import Sidebar from "./sidebar"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
