"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { API_URL } from "@/lib/constant"

export default function SignupPage() {
  const router = useRouter()
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!username || !email) {
        setError("Please fill in all fields")
        setLoading(false)
        return
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email")
        setLoading(false)
        return
      }

      await axios.post(`${API_URL}/auth/signup`, { username, email })

      alert("Account created successfully! Check your email for login credentials.")
      router.push("/login")
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Signup failed")
      } else {
        setError("An error occurred. Please try again.")
      }
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="
      space-y-6 p-8 w-full max-w-md rounded-2xl
      border shadow-xl

      bg-white/60 backdrop-blur-xl border-gray-200
      dark:bg-white/10 dark:border-white/20
    ">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="
            w-12 h-12 rounded-lg flex items-center justify-center shadow-lg
            bg-gradient-to-br from-purple-500 to-purple-700
          ">
            <span className="text-white font-bold text-xl">₿</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
        <p className="text-gray-600 dark:text-gray-300">Join BITTOP and start investing</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="
            p-3 rounded-lg border text-sm
            bg-red-100 border-red-300 text-red-700
            dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400
          ">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            disabled={loading}
            className="
              w-full px-4 py-2 rounded-lg border
              bg-white text-gray-900 placeholder-gray-400
              focus:ring-2 focus:ring-purple-500/40

              dark:bg-white/10 dark:text-white dark:placeholder-gray-300
              dark:border-white/20
            "
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="
              w-full px-4 py-2 rounded-lg border
              bg-white text-gray-900 placeholder-gray-400
              focus:ring-2 focus:ring-purple-500/40

              dark:bg-white/10 dark:text-white dark:placeholder-gray-300
              dark:border-white/20
            "
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-2 px-4 rounded-lg font-medium text-white
            bg-purple-600 hover:bg-purple-700 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}