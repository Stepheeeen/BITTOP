"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { TrendingUp, Shield, Zap, Users, ArrowRight, Coins } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-purple-50/30 dark:via-purple-950/20 to-background">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-40 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">₿</span>
            </div>
            <span className="font-bold text-lg text-foreground">BITTOP</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-foreground hover:text-primary transition-colors font-medium">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-8">
        <div className="space-y-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Invest in Cryptocurrency
            <span className="block bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
              Confidently
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            BITTOP is your professional cryptocurrency investment platform. Track, manage, and grow your digital
            assets with industry-leading security and intuitive tools.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => router.push("/signup")}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
            >
              Start Investing <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/login"
              className="px-8 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="relative mt-12 rounded-2xl overflow-hidden border border-border bg-muted/50">
          <div className="aspect-video bg-gradient-to-br from-purple-500/10 to-purple-700/10 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Coins className="w-16 h-16 mx-auto text-primary/50" />
              <p className="text-muted-foreground">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Powerful Features</h2>
          <p className="text-muted-foreground">Everything you need to manage your crypto portfolio</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
            <TrendingUp className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Portfolio Tracking</h3>
            <p className="text-muted-foreground">
              Real-time portfolio updates with advanced analytics and performance tracking across all your investments.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
            <Shield className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Bank-Level Security</h3>
            <p className="text-muted-foreground">
              Military-grade encryption and multi-factor authentication to protect your digital assets and personal
              data.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
            <Zap className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Fast Transactions</h3>
            <p className="text-muted-foreground">
              Lightning-fast buy and sell transactions with competitive fees and instant order execution.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
            <Coins className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Multiple Cryptocurrencies</h3>
            <p className="text-muted-foreground">
              Invest in Bitcoin, Ethereum, and thousands of other digital assets all from one dashboard.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
            <Users className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Expert Support</h3>
            <p className="text-muted-foreground">
              24/7 customer support and educational resources to help you make informed investment decisions.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
            <TrendingUp className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">Market Insights</h3>
            <p className="text-muted-foreground">
              Advanced market analysis, price alerts, and investment recommendations based on real-time data.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <p className="text-4xl font-bold text-primary">500K+</p>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-primary">$2.5B+</p>
            <p className="text-muted-foreground">Assets Under Management</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-primary">50+</p>
            <p className="text-muted-foreground">Supported Cryptocurrencies</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="rounded-2xl bg-gradient-to-r from-purple-500/10 to-purple-700/10 border border-primary/20 p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to Start Investing?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join thousands of investors already growing their crypto portfolio with BITTOP.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/signup")}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              Create Free Account
            </button>
            <Link
              href="/login"
              className="px-8 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 BITTOP. All rights reserved. Professional cryptocurrency investment platform.</p>
        </div>
      </footer>
    </div>
  )
}
