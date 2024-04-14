import { Typography } from '@/components/ui/typography'
import { auth } from '@/server/auth'
import type { NextPage } from 'next'

const Page: NextPage = async () => {
  const { user } = await auth()
  return <Typography variant="h3">Hello {user?.name}</Typography>
}

export default Page
