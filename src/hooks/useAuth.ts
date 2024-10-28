'use client'
import { useEffect, useState } from 'react'
import { getCurrentUser, signOut } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'

export function useAuth(requireAuth = false) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      await getCurrentUser()
      setIsAuthenticated(true)
    } catch {
      setIsAuthenticated(false)
      if (requireAuth) {
        router.push('/login')
      }
    } finally {
      setIsLoading(false)
    }
  }
  const handleLogout = async () => {
    await signOut()
    setIsAuthenticated(false)
    router.push('/login')
  }

  return { isAuthenticated, isLoading, logout: handleLogout }
}
