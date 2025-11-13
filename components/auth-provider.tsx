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

  // Pages that should NOT require authentication
  const publicRoutes = ["/login", "/signup", "/landing"]

  useEffect(() => {
    const session = getSession()
    setUser(session?.user || null)
    setIsLoading(false)

    const isPublicPage = publicRoutes.includes(pathname)

    // 1. If user is NOT logged in and trying to enter a protected page → redirect to login
    if (!session && !isPublicPage) {
      router.push("/login")
      return
    }

    // 2. If user IS logged in and tries to access login or signup → redirect home
    if (session && ["/login", "/signup"].includes(pathname)) {
      router.push("/dashboard")
      return
    }
  }, [router, pathname])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
