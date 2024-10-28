'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import ResponsiveLogo from '@/components/responsive-logo/responsive-logo'
import { useAuth } from '@/hooks/useAuth'
export default function Navbar() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav isLoggedIn={isAuthenticated} />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center h-5 w-auto">
            <div className="flex items-center">
              <ResponsiveLogo />
            </div>
          </Link>
        </div>
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <Link href={isAuthenticated ? "/feed" : "/features"} className="hover:text-primary">
            {isAuthenticated ? "Feed" : "Features"}
          </Link>
          <Link href={isAuthenticated ? "/profile" : "/about"} className="hover:text-primary">
            {isAuthenticated ? "Profile" : "About"}
          </Link>
          <Link href="/subvest" className="hover:text-primary">Subvest</Link>
        </nav>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      </div>
      
    </header>
  )
}
// Update the MobileNav prop type to accept null
function MobileNav({ isLoggedIn }: { isLoggedIn: boolean | null }) {
  // Convert null to false for safety
  const isAuthenticated = !!isLoggedIn

  return (
    <div className="container mx-auto flex flex-col space-y-3">
      <Link href="/" className="mb-4">
        <div className="max-h-[40px] w-auto flex items-center">
          <ResponsiveLogo />
        </div>
      </Link>
      <Link href={isAuthenticated ? "/feed" : "/features"} className="font-medium">
        {isAuthenticated ? "Feed" : "Features"}
      </Link>
      <Link href={isAuthenticated ? "/profile" : "/about"} className="font-medium">
        {isAuthenticated ? "Profile" : "About"}
      </Link>
      <Link href="/subvest" className="font-medium">Subvest</Link>
      {!isAuthenticated && (
        <>
          <Link href="/login" className="font-medium">Login</Link>
          <Link href="/register" className="font-medium">Register</Link>
        </>
      )}
    </div>
  )
}
