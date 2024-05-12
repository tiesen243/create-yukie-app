'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, TextField } from '@/components/ui/form'
import { api } from '@/lib/api'

const schema = z.object({
  email: z.string().email('Email is invalid'),
  password: z.string().min(8, 'Password is too short'),
})

const Page: NextPage = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })
  const handleSubmit = form.handleSubmit(async (formData: z.infer<typeof schema>) => {
    const { data, error } = await api.user['sign-in'].post(formData)
    if (error) {
      toast.error(error.value.message)
      return
    }
    toast.success(data.message)
    router.push('/')
    router.refresh()
  })
  const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <TextField key={field.name} control={form.control} disabled={isPending} {...field} />
        ))}
        <Button className="w-full" isLoading={isPending}>
          Login
        </Button>
      </form>
    </Form>
  )
}

const fields = [
  { name: 'email', label: 'Email', placeholder: 'Enter your email', type: 'email' },
  { name: 'password', label: 'Password', placeholder: 'Enter your password', type: 'password' },
]

export default Page
