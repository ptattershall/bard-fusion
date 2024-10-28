'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { loginUser } from './actions'
import BannerLogo from '@/components/responsive-logo/banner-logo'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export type LoginFormData = z.infer<typeof schema>
export default function LoginPage() {
  const [error, setError] = useState('')
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  const handleSubmit = async (formData: FormData) => {
    setError('')
    
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    const result = await loginUser({ email, password })
    
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'An error occurred during login')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background/90">
          <div className="flex justify-center mb-4">
            <BannerLogo />
          </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login to BardFusion</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="you@example.com" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password"
                type="password"
                required 
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline dark:text-blue-400">
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
