'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { FileField, Form } from '@/components/ui/form'

const schema = z.object({
  file: z.optional(z.instanceof(File)),
})

const Page: NextPage = () => {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })
  const handleSubmit = form.handleSubmit(async (formData: z.infer<typeof schema>) => {
    console.log(formData)
  })
  const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <FileField name="name" control={form.control} label="File" accept="image/*" />
        <Button className="w-full" isLoading={isPending}>
          Upload
        </Button>
      </form>
    </Form>
  )
}

export default Page
