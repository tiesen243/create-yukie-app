import type { Metadata, NextPage } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication for Next.js x ElysiaJS',
  openGraph: { images: '/og?title=Authentication&desc=Authentication for Next.js x ElysiaJS' },
}

const AuthLayout: NextPage<React.PropsWithChildren> = ({ children }) => (
  <div className="mx-auto grid min-h-[80dvh] max-w-screen-md place-items-center *:min-w-full *:space-y-4">
    {children}
  </div>
)

export default AuthLayout
