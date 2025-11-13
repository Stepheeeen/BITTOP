"use client"

import { Menu, Bell, Moon, Sun, User } from "lucide-react"
import { useState, useEffect } from "react"
import axiosClient from "@/lib/axiosClient"
import { getSession } from "@/lib/auth"

interface TopBarProps {
  onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains("dark"))
    // Fetch user profile for email
    const session = getSession()
    const token = session?.token
    if (!token) return
    axiosClient
      .get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserEmail(res.data.email || "")
      })
      .catch(() => {})
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="px-6 py-4 flex items-center justify-between">
        <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors">
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          {mounted && (
            <button onClick={toggleTheme} className="p-2 hover:bg-muted rounded-lg transition-colors">
              {isDark ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
            </button>
          )}
          <div className="ml-4 flex items-center gap-3 pl-4 border-l border-border">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{userEmail || "User"}</p>
              <p className="text-xs text-muted-foreground">Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
