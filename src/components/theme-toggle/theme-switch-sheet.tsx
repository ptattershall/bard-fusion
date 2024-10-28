"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import ThemeSwitch from "./theme-switch"

export default function ThemeSwitchSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  if (!mounted) {
    return null
  }

  const isDarkMode = theme === 'dark'

  return (
    <>
      <div
        className={`
          fixed top-28 right-0 -translate-y-1/2 h-20 w-48 bg-accent shadow-lg transform transition-transform duration-300 ease-in-out rounded-l-md
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="h-full flex items-center justify-center ">
            <span className="sr-only">{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</span>
            <ThemeSwitch />
        </div>
      </div>
      <button
        onClick={toggleOpen}
        className={`
          fixed top-28 right-0 transform -translate-y-1/2 p-2 rounded-l-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent
          transition-colors duration-200 ease-in-out
          ${isDarkMode ? 'bg-accent text-primary-foreground' : 'bg-accent text-secondary-foreground'}
        `}
        aria-label="Toggle theme settings"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <IconChevronRight className="w-6 h-6" />
        ) : (
          <IconChevronLeft className="w-6 h-6" />
        )}
      </button>
    </>
  )
}