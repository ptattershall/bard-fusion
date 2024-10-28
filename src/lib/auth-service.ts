import { signIn, signUp, confirmSignUp, signOut, getCurrentUser, AuthError } from 'aws-amplify/auth';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const AUTH_COOKIE = 'auth_token';
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/'
};

export async function login(email: string, password: string) {
  try {
    const result = await signIn({ username: email, password });
    
    if (result.isSignedIn) {
      // Get the session tokens - you'll need to implement this based on your Cognito setup
      const session = await fetch('cognito-identity/getCredentials', {
        credentials: 'include',
      }).then(res => res.json());

      // Set HTTP-only cookie
      cookies().set(AUTH_COOKIE, session.token, cookieOptions);
      revalidatePath('/');
    }

    return { success: true, data: result };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof AuthError ? error.message : 'An error occurred during login' 
    };
  }
}

export async function register(email: string, password: string, username: string) {
  try {
    const result = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          preferred_username: username
        }
      }
    });
    return { success: true, data: result };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof AuthError ? error.message : 'An error occurred during registration' 
    };
  }
}

export async function confirmRegistration(email: string, code: string) {
  try {
    const result = await confirmSignUp({
      username: email,
      confirmationCode: code
    });
    return { success: true, data: result };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof AuthError ? error.message : 'An error occurred during confirmation' 
    };
  }
}

export async function logout() {
  try {
    await signOut();
    // Remove the auth cookie
    cookies().delete(AUTH_COOKIE);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof AuthError ? error.message : 'An error occurred during logout' 
    };
  }
}

export async function getUser() {
  try {
    const user = await getCurrentUser();
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: 'No authenticated user' };
  }
}

export function getAuthCookie() {
  return cookies().get(AUTH_COOKIE);
}

export function isAuthenticated() {
  return !!getAuthCookie();
}
