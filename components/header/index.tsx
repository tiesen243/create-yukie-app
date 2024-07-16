import Link from 'next/link'
import Image from 'next/image'

import { ThemeToggle } from './theme-toggle'
import { Auth } from './auth'

export const Header: React.FC = () => {
  return (
    <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" className="dark:invert" width={28} height={28} />
        </Link>

        <div className="flex items-center gap-2">
          <Auth />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
