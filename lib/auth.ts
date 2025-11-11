// Simple authentication context and utilities
interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

interface AuthSession {
  user: User
  token: string
  expiresAt: number
}

// Simulate auth storage
const AUTH_STORAGE_KEY = "BITTOP_auth"

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!stored) return null

    const session = JSON.parse(stored) as AuthSession
    if (session.expiresAt < Date.now()) {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return null
    }

    return session
  } catch {
    return null
  }
}

export function setSession(user: User, token: string): void {
  const session: AuthSession = {
    user,
    token,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function generateMockUser(email: string, name: string): User {
  return {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email,
    name,
    createdAt: new Date().toISOString(),
  }
}
