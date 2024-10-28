import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Home, Search, HelpCircle } from 'lucide-react'
import BannerLogo from '@/components/responsive-logo/banner-logo'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 py-6">
      <BannerLogo />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-xl mb-8 text-center max-w-md">Oops! It seems the creative muse has led you astray. This page doesn't exist in our realm of storytelling.</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/search">
            <Search className="mr-2 h-4 w-4" />
            Search Projects
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/help">
            <HelpCircle className="mr-2 h-4 w-4" />
            Get Help
          </Link>
        </Button>
      </div>
    </div>
  )
}