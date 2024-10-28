"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { IconBulb, IconBulbOff } from "@tabler/icons-react"

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
  
    useEffect(() => {
      setMounted(true)
    }, [])
  
    if (!mounted) {
      return null
    }
  
    const isDarkMode = theme === 'dark'
  
    const toggleTheme = () => {
      setTheme(isDarkMode ? 'light' : 'dark')
    }
  
    return (
        <button
            onClick={toggleTheme}
            className={`
            relative w-16 h-8 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
            ${isDarkMode ? 'bg-secondary' : 'bg-secondary'}
            `}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            <span className="sr-only">{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</span>
            <div
            className={`
                absolute top-0.5 left-0.5 w-7 h-7 rounded-full transition-transform duration-200 ease-in-out transform
                ${isDarkMode ? 'translate-x-8 bg-primary' : 'translate-x-0 bg-primary'}
            `}
            >
            <div className="absolute inset-0 flex items-center justify-center">
                {isDarkMode ? (
                <IconBulbOff className="w-4 h-4 text-gray-800" />
                ) : (
                <IconBulb className="w-4 h-4 text-gray-100" />
                )}
            </div>
            </div>
        </button>
    )
    }