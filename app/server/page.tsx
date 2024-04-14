import type { NextPage } from 'next'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { Typography } from '@/components/ui/typography'
import { api } from '@/lib/api'
import { auth } from '@/server/auth'

const Page: NextPage = async () => {
  const { user } = await auth()

  const action = async (fd: FormData) => {
    'use server'
    const content = String(fd.get('content'))
    const { data, error } = await api.post.create.post(
      { content },
      { headers: { Cookie: cookies().toString() } },
    )
    if (error) console.log(error.value)
    console.log(data)
    revalidatePath('/server')
  }

  const { data: posts } = await api.post.getAll.get()

  return (
    <>
      <Typography variant="h2">Hello, {user?.name} from Server side!</Typography>

      <section className="mx-auto mt-4 max-w-screen-md space-y-4">
        <form action={action} className="space-y-4">
          <FormField name="content" placeholder="What are you thinking?" className="flex-grow" />
          <Button className="w-full">Send</Button>
        </form>

        {posts?.map((post) => (
          <div key={post.id} className="rounded-md border p-4">
            <Typography color="muted">{post.author.name}</Typography>
            <Typography variant="h3">{post.content}</Typography>
          </div>
        ))}
      </section>
    </>
  )
}

export default Page
