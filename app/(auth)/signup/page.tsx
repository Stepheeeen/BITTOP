"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { setSession, generateMockUser } from "@/lib/auth"
import { Eye, EyeOff, Check } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const passwordStrength = {
    hasLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  }

  const isPasswordStrong = Object.values(passwordStrength).every(Boolean)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (!name || !email || !password || !confirmPassword) {
        setError("Please fill in all fields")
        setLoading(false)
        return
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email")
        setLoading(false)
        return
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters")
        setLoading(false)
        return
      }

      if (password !== confirmPassword) {
        setError("Passwords don't match")
        setLoading(false)
        return
      }

      if (!isPasswordStrong) {
        setError("Password doesn't meet strength requirements")
        setLoading(false)
        return
      }

      const user = generateMockUser(email, name)
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setSession(user, token)

      router.push("/")
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
        <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
        <p className="text-muted-foreground">Join BITTOP and start investing</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-foreground">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-base"
            disabled={loading}
          />
        </div>

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

          {/* Password strength */}
          <div className="space-y-2 mt-3">
            <p className="text-xs font-medium text-muted-foreground">Password strength:</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.hasLength ? "bg-green-500" : "bg-muted"}`}
                >
                  {passwordStrength.hasLength && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-xs text-muted-foreground">At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.hasUppercase ? "bg-green-500" : "bg-muted"}`}
                >
                  {passwordStrength.hasUppercase && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-xs text-muted-foreground">Contains uppercase letter</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.hasNumber ? "bg-green-500" : "bg-muted"}`}
                >
                  {passwordStrength.hasNumber && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-xs text-muted-foreground">Contains a number</span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-base"
            disabled={loading}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !isPasswordStrong}
          className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
