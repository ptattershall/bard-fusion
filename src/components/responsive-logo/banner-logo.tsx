'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function BannerLogo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === 'dark'

  return (
    <div>
      <Image
        src={isDark ? '/logo_dark.png' : '/logo_light.png'}
        alt="BardFusion Logo"
        width={160}
        height={40}
        className="-mt-2"
        style={{ width: 'auto', height: 'auto' }}
      />
    </div>
  )
}