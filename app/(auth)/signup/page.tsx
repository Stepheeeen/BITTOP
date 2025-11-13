"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { Eye, EyeOff, Check } from "lucide-react"
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
      if (!username || !email ) {
        setError("Please fill in all fields")
        setLoading(false)
        return
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email")
        setLoading(false)
        return
      }

      // Axios API call
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
      })

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
    <div className="space-y-6 p-8 w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">₿</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white">Create Account</h1>
        <p className="text-gray-300">Join BITTOP and start investing</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-white">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 
              text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 
              text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            disabled={loading}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 rounded-lg bg-purple-600/80 backdrop-blur-sm 
            text-white font-medium hover:bg-purple-600 transition-colors 
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center">
        <p className="text-sm text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
