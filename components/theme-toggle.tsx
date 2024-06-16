'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <Button variant="outline" size="icon" isLoading />

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
