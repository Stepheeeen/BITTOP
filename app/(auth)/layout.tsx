import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/50 dark:via-purple-950/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
