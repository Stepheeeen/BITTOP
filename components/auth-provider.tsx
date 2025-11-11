"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getSession } from "@/lib/auth"

interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const session = getSession()
    setUser(session?.user || null)
    setIsLoading(false)

    // Redirect logic
    if (!session && !pathname.startsWith("/auth") && pathname !== "/") {
      router.push("/login")
    }

    if (session && pathname.startsWith("/auth")) {
      router.push("/")
    }
  }, [router, pathname])

  return <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
