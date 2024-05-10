'use client'

import { SendHorizonalIcon } from 'lucide-react'
import { useRef, useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { api } from '@/lib/api'
import { revalidate } from '@/lib/revalidate'

export const CreatePost: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()
  const action = (fd: FormData) =>
    startTransition(async () => {
      const { error } = await api.post.create.post({ content: String(fd.get('content')) })
      if (error) toast.error(error.value.message ?? 'Unknow error')
      else revalidate('posts')
      formRef.current?.reset()
    })
  return (
    <form
      ref={formRef}
      action={action}
      className="container mb-4 flex max-w-screen-md items-center gap-4"
    >
      <FormField
        name="content"
        placeholder="What's on your mind?"
        className="w-full"
        disabled={isPending}
      />
      <Button variant="ghost" size="icon" isLoading={isPending}>
        <SendHorizonalIcon />
      </Button>
    </form>
  )
}
