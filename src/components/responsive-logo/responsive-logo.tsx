'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import styles from './responsive-logo.module.css'

export default function ResponsiveLogo() {
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
    <div className={styles.logoContainer}>
      <Image
        src={isDark ? '/icon_dark.png' : '/icon_light.png'}
        alt="BardFusion Icon"
        width={40}
        height={40}
        className={styles.icon}
        style={{ width: 'auto', height: 'auto' }}
      />
      <Image
        src={isDark ? '/logo_dark.png' : '/logo_light.png'}
        alt="BardFusion Logo"
        width={160}
        height={40}
        className={`${styles.logo} -mt-2`}
        style={{ width: '120px', height: '40px' }}
      />
    </div>
  )
}
