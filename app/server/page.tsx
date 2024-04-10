import type { NextPage } from 'next'

import { Typography } from '@/components/ui/typography'
import { auth } from '@/server/auth'

const Page: NextPage = async () => {
  const { user } = await auth()

  return <Typography variant="h2">Hello, {user?.name} from Server side!</Typography>
}

export default Page
