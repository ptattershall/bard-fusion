import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add paths that should be protected
const protectedPaths = ['/dashboard', '/profile', '/settings']

// Add paths that should be accessible only to non-authenticated users
const authPaths = ['/login', '/register']

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth_token')
  const isAuthenticated = !!authCookie
  const path = request.nextUrl.pathname

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authPaths.includes(path)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect non-authenticated users to login
  if (!isAuthenticated && protectedPaths.some(p => path.startsWith(p))) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('from', path)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: {
    source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    missing: [
      { type: 'header', key: 'next-router-prefetch' },
      { type: 'header', key: 'purpose', value: 'prefetch' },
    ],
  },
}
