"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { setSession, generateMockUser } from "@/lib/auth"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (!email || !password) {
        setError("Please fill in all fields")
        setLoading(false)
        return
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email")
        setLoading(false)
        return
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        setLoading(false)
        return
      }

      // Create mock user session
      const user = generateMockUser(email, email.split("@")[0])
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setSession(user, token)

      router.push("/dashboard")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
            <span className="text-white font-bold text-xl">₿</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
        <p className="text-muted-foreground">Sign in to your BITTOP account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-base"
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-base pr-10"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
        <Link href="/" className="text-sm text-primary hover:underline block">
          Back to home
        </Link>
      </div>

      {/* Demo credentials */}
      <div className="p-3 rounded-lg bg-muted/50 border border-muted text-xs text-muted-foreground space-y-1">
        <p className="font-medium">Demo Credentials:</p>
        <p>Email: demo@example.com</p>
        <p>Password: demo123</p>
      </div>
    </div>
  )
}
