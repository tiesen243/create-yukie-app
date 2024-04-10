import type { NextPage } from 'next'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { Typography } from '@/components/ui/typography'
import { api } from '@/lib/api'
import { auth } from '@/server/auth'

const Page: NextPage = async () => {
  const { user } = await auth()
  const session = cookies().get('auth_session')

  const posts = await api.post.all.get()

  const action = async (formData: FormData) => {
    'use server'
    const content = String(formData.get('content'))
    await api.post.create.post(
      { content },
      { headers: { Cookie: `auth_session=${session?.value}` } },
    )
    revalidatePath('/middleware')
  }

  const deletePost = async (formData: FormData) => {
    'use server'
    const id = String(formData.get('id'))
    await api.post.del({ id }).delete({}, { headers: { Cookie: `auth_session=${session?.value}` } })
    revalidatePath('/middleware')
  }
  return (
    <>
      <Typography variant="h2">Hello, {user?.name} from Server side!</Typography>

      <div className="mx-auto mt-4 max-w-screen-md space-y-4">
        <form action={action} className="space-y-4">
          <FormField name="content" label="Content" />
          <Button type="submit" className="w-full">
            Create Post
          </Button>
        </form>

        <Typography variant="h3">Posts</Typography>

        {posts.data?.map((post) => (
          <Card key={post.id}>
            {post.author.id === user?.id && (
              <form action={deletePost} className="absolute right-2 top-2 z-10">
                <input type="hidden" name="id" value={post.id} />
                <Button type="submit" variant="ghost" size="icon">
                  <XIcon />
                </Button>
              </form>
            )}

            <CardHeader>
              <CardDescription>{post.author.name}</CardDescription>
              <CardTitle>{post.content}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Page
