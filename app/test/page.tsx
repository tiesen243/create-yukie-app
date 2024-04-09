import { api } from '@/lib/api/server'
import type { NextPage } from 'next'

const Page: NextPage = async () => {
  const action = async () => {
    'use server'
    const { data, error } = await api.post.create.post({ content: 'Hello World' })
    console.log({ data, error: error?.value })
  }
  return (
    <form action={action}>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Page
