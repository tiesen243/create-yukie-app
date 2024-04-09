'use client'

import { useRef } from 'react'
import { SendHorizonalIcon } from 'lucide-react'

import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { usePost } from '@/lib/hooks'
import { Button } from './ui/button'

export const CreatePost: React.FC = () => {
  const { create: trigger, isMutating, createError } = usePost()
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <Card className="mx-auto mb-4 max-w-screen-md">
      <form
        ref={formRef}
        action={(fd: FormData) => {
          trigger({ content: String(fd.get('content')) })
          formRef.current?.reset()
        }}
      >
        <CardHeader className="flex-row items-center gap-2 space-y-0">
          <FormField name="content" placeholder="What are you thinking?" className="flex-grow" />
          <Button variant="ghost" size="icon" isLoading={isMutating}>
            <SendHorizonalIcon />
          </Button>
        </CardHeader>
        <CardFooter>
          {createError && (
            <p className="text-destructive">Error: {createError?.fieldsError?.content}</p>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
