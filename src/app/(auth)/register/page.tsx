'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { registerUser, checkUsernameUnique } from './actions'
import BannerLogo from '@/components/responsive-logo/banner-logo'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type RegisterFormData = z.infer<typeof schema>

export default function RegisterPage() {
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>({
    resolver: zodResolver(schema)
  })

  const username = watch('username')

  const { data: isUsernameUnique, isLoading: isCheckingUsername } = useQuery(
    {
      queryKey: ['checkUsername', username],
      queryFn: () => checkUsernameUnique(username),
      enabled: !!username && username.length >= 3
    }
  )

  const mutation = useMutation({
    mutationFn: (data: RegisterFormData) => registerUser(data)
  })

  const onSubmit = (data: RegisterFormData) => {
    setServerError(null)
    if (!isUsernameUnique) {
      setServerError('Username is already taken')
      return
    }
    mutation.mutate(data)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pb-6">
        <div className="flex flex-col items-center justify-center mb-4">
            <BannerLogo />
        </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register for BardFusion</CardTitle>
          <CardDescription>Join our community of creators</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...register('username')} />
              {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
              {isCheckingUsername && <p className="text-sm text-blue-500">Checking username...</p>}
              {!isCheckingUsername && username && username.length >= 3 && (
                <p className="text-sm text-green-500">
                  {isUsernameUnique ? 'Username is available' : 'Username is taken'}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            {serverError && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={mutation.isPending || isCheckingUsername}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
