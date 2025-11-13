"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LayoutDashboard, TrendingUp, Wallet, Settings, LogOut, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { clearSession } from "@/lib/auth"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const router = useRouter()
  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/market", label: "Market", icon: TrendingUp },
    { href: "/portfolio", label: "Portfolio", icon: BarChart3 },
    { href: "/wallet", label: "Deposit", icon: Wallet },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-50 lg:z-0 transition-transform duration-300 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">₿</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-sidebar-foreground">BITTOP</h1>
              <p className="text-xs text-sidebar-foreground/60">Investment Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 space-y-2 border-t border-sidebar-border">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
          <button
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sidebar-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors text-left"
            onClick={() => {
              clearSession()
              router.push("/auth/login")
            }}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
