"use client"
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconBrandLinkedin, IconBrandYoutube } from '@tabler/icons-react'
import ResponsiveLogo from './responsive-logo/responsive-logo'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <ResponsiveLogo />
            <p className="text-sm">
              BardFusion: Where creativity meets technology. Empowering artists and innovators to shape the future of digital expression.
            </p>
          </div>
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <ul className="space-y-3 flex-1">
                <li><Link href="/" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              </ul>
              <ul className="space-y-3 flex-1 mt-3 sm:mt-0">
                <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link href="/social" className="hover:text-white transition-colors">Social</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <form className="space-y-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button type="submit" className="w-full">Subscribe</Button>
              </form>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-white transition-colors"><IconBrandFacebook size={24} /></Link>
                <Link href="#" className="hover:text-white transition-colors"><IconBrandTwitter size={24} /></Link>
                <Link href="#" className="hover:text-white transition-colors"><IconBrandInstagram size={24} /></Link>
                <Link href="#" className="hover:text-white transition-colors"><IconBrandLinkedin size={24} /></Link>
                <Link href="#" className="hover:text-white transition-colors"><IconBrandYoutube size={24} /></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} BardFusion. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}