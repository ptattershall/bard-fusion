'use server'

import { login } from '@/lib/auth-service'
import { cookies } from 'next/headers'
import { LoginFormData } from './page'

export async function loginUser(formData: LoginFormData) {
  const email = formData.email
  const password = formData.password

  const result = await login(email, password)

  if (result.success) {
    cookies().set('session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
  }

  return result
}
