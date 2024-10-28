'use server'

import { signUp } from 'aws-amplify/auth'
import { RegisterFormData } from './page'

export async function registerUser(data: RegisterFormData) {
  try {
    const result = await signUp({
      username: data.username,
      password: data.password,
      options: {
        userAttributes: {
          email: data.email
        }
      }
    })
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed to register user' }
  }
}

export async function checkUsernameUnique(username: string) {
  // Replace this with actual API call to your backend
  await new Promise(resolve => setTimeout(resolve, 1000))
  return Math.random() > 0.5
}