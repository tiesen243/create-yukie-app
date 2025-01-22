'use client'

import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export const ThemeBtn: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const [isMounted, setMount] = useState<boolean>(false)
  useEffect(() => {
    setMount(true)
  }, [])
  if (!isMounted) return null

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed bottom-4 right-4"
      onClick={toggle}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
